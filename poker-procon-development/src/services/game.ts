import type winston from 'winston';

import { DATA_FILE_PATH } from '@/constants';
import { CARDS, HAND_RANK, HAND_SIZE } from '@/constants/game';
import { getLogger } from '@/libs/logger';
import type { Card, CardSet } from '@/schema/card';
import type { Game, GameInfo } from '@/schema/game';
import type { Player } from '@/schema/player';
import { generateErrorObject } from '@/utils';
import { convertRankCard, evaluateHand } from '@/utils/hand';

import FileService from './file';
import Players from './players';
import Round from './round';

const DATA_FILE_FULL_PATH = `${process.cwd()}/${DATA_FILE_PATH}`;

class GameService {
  private game: Game; // ゲーム情報

  private counter: number; // ラウンド

  private players: any[];

  private readonly appLogger: winston.Logger | null | undefined; // application logger

  private gameLogger: winston.Logger | null | undefined; // game logger

  private readonly pointLogger: winston.Logger | null | undefined; // point logger

  constructor(id: string) {
    this.counter = 1;
    this.appLogger = getLogger({ group: 'application', gameId: id });
    this.pointLogger = getLogger({ group: 'point', gameId: id });

    // ゲームデータを取得
    const data = FileService.readFile(DATA_FILE_FULL_PATH, `${id}.json`);
    const game = JSON.parse(data ?? '') as Game;
    if (!game)
      throw new Error(
        JSON.stringify({
          status: 404,
          errors: [generateErrorObject('BD001')],
        })
      );

    this.game = {
      ...game,
      status: 'progress',
      startedAt: new Date().toJSON(),
    };
    this.updateGame();

    // プレイヤーを初期化
    const player1 =
      this.game.seatingOrder[0] &&
      new Players[this.game.seatingOrder[0]](
        this.game.id,
        this.game.seatingOrder[0]
      );
    const player2 =
      this.game.seatingOrder[1] &&
      new Players[this.game.seatingOrder[1]](
        this.game.id,
        this.game.seatingOrder[1]
      );
    const player3 =
      this.game.seatingOrder[2] &&
      new Players[this.game.seatingOrder[2]](
        this.game.id,
        this.game.seatingOrder[2]
      );
    const player4 =
      this.game.seatingOrder[3] &&
      new Players[this.game.seatingOrder[3]](
        this.game.id,
        this.game.seatingOrder[3]
      );
    this.players = [player1, player2, player3, player4];

    // ポイントログ1行目
    this.pointLogger?.info(
      ['round', player1.name, player2.name, player3.name, player4.name].join(
        ','
      )
    );
    // ポイントログ2行目
    this.pointLogger?.info(
      [
        0,
        game.initialPoint,
        game.initialPoint,
        game.initialPoint,
        game.initialPoint,
      ].join(',')
    );
  }

  /**
   * ゲーム開始
   */
  public start(): void {
    this.appLogger?.info(`Game start. id: ${this.game.id}`);

    try {
      while (
        this.game.totalRound >= this.counter &&
        this.game.status === 'progress'
      ) {
        this.playPoker(this.counter);
      }
    } catch (e: any) {
      this.appLogger?.error(e.message);
      throw e instanceof Error ? e : new Error(e);
    }

    this.game.status = 'finished';
    this.updateGame();

    this.appLogger?.info(
      `Game end. ID: ${this.game.id}, player: ${JSON.stringify(
        this.game.players
      )}`
    );
  }

  /**
   * ラウンド別に出力すログの共通フォーマット
   * @param text
   * @returns
   */
  private static formattedRoundLog(round: number, text: string): string {
    return `<Round: ${round}>: ${text}`;
  }

  /**
   * ゲーム情報ファイルを更新する
   */
  private updateGame() {
    FileService.writeFile(
      DATA_FILE_FULL_PATH,
      `${this.game.id}.json`,
      JSON.stringify(this.game, null, 2)
    );
  }

  /**
   * プレイヤーに送付するデータを生成する
   * @param round
   * @param name
   */
  private generateSendInfo(round: Round, name: string): GameInfo {
    const players: {
      [key: string]: Player;
    } = {};

    Object.values(this.game.players).forEach((player) => {
      if (!player.round) return;

      players[player.name] = {
        ...player,
        round: {
          ...player.round,
          cards: player.name === name ? player.round.cards ?? [] : [],
        },
      };
    });

    return {
      initialPoint: this.game.initialPoint,
      totalRound: this.game.totalRound,
      fee: this.game.fee,
      currentRound: round.current,
      phase: round.phase,
      order: round.order,
      pot: round.pot,
      minBetPoint: round.minBetPoint,
      players,
      winner: round.winner,
    };
  }

  /**
   * プレイヤーが生存しているか判定する
   * @param name
   * @returns
   */
  private isAlive(name: string): boolean {
    return (
      (this.game.players[name]?.status === 'active' &&
        this.game.players[name].round.action !== 'drop') ??
      false
    );
  }

  /**
   * アクティブなプレイヤーの一覧を取得する
   * @returns
   */
  private activePlayers(): string[] {
    return Object.keys(this.game.players).filter(
      (name) => this.game.players[name]?.status === 'active'
    );
  }

  /**
   * ポーカーのラウンドを進行する
   * @returns
   */
  private playPoker(counter: number): void {
    this.gameLogger = getLogger({
      group: 'game',
      gameId: this.game.id,
      round: counter,
    });
    const order = this.players.map((playerInstance) => playerInstance.name); // プレイ順を取得
    const round = new Round(this.game.id, counter, order);

    this.appLogger?.info(
      GameService.formattedRoundLog(
        round.current,
        `Round start. ID: ${this.game.id}, round: ${round.current}, order: ${round.order}`
      )
    );

    // 参加チェック
    const join: { [key: string]: number } = {};
    for (let i = 0; i < round.order.length; i += 1) {
      const name = round.order[i];
      if (!name || !this.game.players[name]) return;

      // ラウンドに参加できる場合は、参加フィーを支払う
      if (this.isAlive(name)) {
        round.join(this.game.players[name], this.game.fee);
        this.game.players[name].point -= this.game.fee;
        join[name] = this.game.players[name].point;
      }
    }

    this.gameLogger?.info({
      round: round.current,
      player: '',
      phase: 'start',
      content: {
        type: 'start',
        order: round.order,
        join,
      },
      game: structuredClone(this.game),
      pot: round.pot,
      minBetPoint: round.minBetPoint,
    });

    // 全プレイヤーのラウンド開始時の処理を呼び出す
    this.players.forEach((playerInstance) => {
      playerInstance.start(this.generateSendInfo(round, playerInstance.name));
    });

    // 山札をシャッフルする
    round.shuffle(CARDS);

    // カードを順番に配布する
    this.players.forEach((playerInstance) => {
      const { name } = playerInstance;
      if (!this.game.players[name]?.round) return;
      if (this.isAlive(name)) {
        // カードをランク順に並べる（Aが右端）
        this.game.players[name].round.cards = round
          .dealCard(HAND_SIZE)
          .sort(
            (a, b) => convertRankCard(a).number - convertRankCard(b).number
          ) as CardSet<Card>;

        this.appLogger?.info(
          GameService.formattedRoundLog(
            round.current,
            `Deal card. player: ${name}, cards: ${JSON.stringify(
              this.game.players[name].round.cards
            )}`
          )
        );
      }
    });

    // アクション要求（1回目）
    this.betPhese(round);

    // 1回目のアクション要求で誰も賭けていない場合やアクティブなプレイヤーが1人以下になったら2回目のアクション要求を行わないように終了フラグを立てる
    const activePlayers = this.activePlayers();
    this.appLogger?.debug(
      GameService.formattedRoundLog(
        round.current,
        `after bet-1 phase. activePlayers: ${JSON.stringify(activePlayers)}`
      )
    );

    // 手札の交換（1回目）
    this.drawPhase(round);

    if (activePlayers.length <= 1) round.finish();

    // ラウンドが終了している場合は2回目のフェーズをスキップする
    if (!round.isFinished()) {
      // アクション要求（2回目）

      this.betPhese(round);

      // 手札の交換（2回目）
      this.drawPhase(round);
    }

    // 結果発表
    this.resultPhase(round);

    // ラウンド終了
    this.endPhase();
  }

  /**
   * betフェーズの処理
   * この処理は、全員の賭けポイントが確定するまで繰り返し行われます。
   * ポイントが確定する条件は、全プレイヤーのステータスが all-in, drop, out のいずれかになるか、
   * 最後にraiseを宣言した人から1周回り切ることで賭けポイントが確定します。
   * 処理が完了すると、次のフェーズ名が返却されます。
   * @param round
   * @returns
   */
  private betPhese(round: Round): void {
    round.preAction();
    const startBetPoint = round.minBetPoint; // ベットフェーズ開始時の最低賭けポイント

    // 賭けポイントがfixするまで繰り返し
    while (round.continueBet) {
      this.players.forEach((playerInstance: any) => {
        if (!round.continueBet) return;

        const { name } = playerInstance;
        if (!this.game.players[name]) return;

        // 最後にraiseを宣言したプレイヤーと一致したらbetフェーズ終了
        if (round.lastRaisePlayer === name) {
          round.postAction();
          return;
        }

        // 宣言できないプレイヤーはスキップする（out状態, dropしている, all-inを宣言している）
        if (
          !this.isAlive(name) ||
          this.game.players[name]?.round.action === 'all-in'
        )
          return;

        // 1人を除き全員dropした場合はラウンド終了
        if (this.activePlayers().filter((player) => this.isAlive(player)).length <= 1){
          round.postAction();
          return;
        }
          
        // プレイヤーに追加でベットするポイントを問う
        const amount: number = playerInstance.bet(
          this.generateSendInfo(round, name)
        );

        // プレイヤーから申請された追加賭けポイントを処理する
        const { betPoint } = this.game.players[name].round; // ログ出力用にここまで賭けていたポイントを保存しておく
        const {
          action, // 宣言したアクション
          point, // 手元から減らすポイント数
        } = round.action(this.game.players[name], amount);
        this.game.players[name].round.action = action;

        // このラウンドで賭ける自分のポイントを追加し、所持ポイントからポイントを減らす
        this.game.players[name].round.betPoint = this.game.players[name].round
          .betPoint
          ? this.game.players[name].round.betPoint + point
          : point;
        if (round.phase === 'bet-1') {
          this.game.players[name].round.first += point;
        }
        if (round.phase === 'bet-2') {
          this.game.players[name].round.second += point;
        }
        this.game.players[name].point -= point;

        this.appLogger?.debug(
          GameService.formattedRoundLog(
            round.current,
            `Bet ${round.phase}. player: ${
              playerInstance.name
            }, amount: ${amount}, action: ${action}, before: ${
              this.game.players[name].point + point
            }, after: ${
              this.game.players[name].point
            }, betPoint: ${betPoint}, payPoint: ${point}, minBetPoint: ${
              round.minBetPoint
            }`
          )
        );

        // ドロップしたプレイヤーのカードを回収する
        if (action === 'drop') {
          round.collectCard(this.game.players[name]);
          this.game.players[name].round.cards = [];
        }

        this.gameLogger?.info({
          round: round.current,
          player: name,
          phase: round.phase,
          content: {
            type: 'bet',
            amount,
            action,
            payPoint: point,
          },
          game: structuredClone(this.game),
          pot: round.pot,
          minBetPoint: round.minBetPoint,
        });
      });

      // ベットフェーズ開始時の最低賭けポイントと場の最低賭けポイントが同じ場合 = 誰も賭けていない
      if (startBetPoint === round.minBetPoint) {
        this.appLogger?.info(
          GameService.formattedRoundLog(
            round.current,
            `${round.current}>: ${round.phase} No bet.`
          )
        );
        round.postAction();
        break;
      }
    }
  }

  /**
   * 交換フェーズの処理
   * @param round
   */
  private drawPhase(round: Round) {
    round.preDraw();

    this.players.forEach((playerInstance) => {
      const { name } = playerInstance;
      if (!this.isAlive(name) || !this.game.players[name]?.round) return;

      const before = this.game.players[name].round.cards;
      // プレイヤーに交換するカードを問う
      const exchange: boolean[] = playerInstance.draw(
        this.generateSendInfo(round, name)
      );
      const { keep, discard, newCard } = round.draw(
        this.game.players[name].round.cards,
        exchange
      );
      // カードをランク順に並べる（Aが右端）
      this.game.players[name].round.cards = keep
        .concat(newCard)
        .sort(
          (a, b) => convertRankCard(a).number - convertRankCard(b).number
        ) as CardSet<Card>;

      this.gameLogger?.info({
        round: round.current,
        player: name,
        phase: round.phase,
        content: {
          type: 'draw',
          exchange,
          keep,
          discard,
          newCard,
          before,
          after: this.game.players[name].round.cards,
        },
        game: structuredClone(this.game),
        pot: round.pot,
        minBetPoint: round.minBetPoint,
      });

      this.appLogger?.info(
        GameService.formattedRoundLog(
          round.current,
          `Draw card. player: ${name}, before: ${JSON.stringify(
            before
          )}, draw: ${JSON.stringify(exchange)}, after: ${JSON.stringify(
            newCard
          )}`
        )
      );
    });

    round.postDraw();
  }

  /**
   * 結果発表フェーズの処理
   * @param round
   * @returns
   */
  private resultPhase(round: Round) {
    // 全プレイヤーの役をチェック
    const result: {
      [key: string]: {
        cards: CardSet<Card>;
        hand: string;
      };
    } = {};

    for (let i = 0; i < round.order.length; i += 1) {
      const name = round.order[i];
      if (!name || !this.game.players[name] || !this.game.players[name].round)
        return;

      const handRank = evaluateHand(this.game.players[name].round.cards);
      this.game.players[name].round.hand = handRank;
      result[name] = {
        cards: this.game.players[name].round.cards,
        hand: HAND_RANK[handRank] ?? 'Drop',
      };
    }

    // 勝者を決める
    round.result(this.game.players);
    const { winner } = round;
    if (!winner || !this.game.players[winner]) return;
    this.game.players[winner].point += round.pot;

    this.appLogger?.info(
      GameService.formattedRoundLog(
        round.current,
        `Round end. ID: ${this.game.id}, round: ${round.current} phase: ${
          round.phase
        }, winner: ${round.winner}, hand: ${
          this.game.players[winner].round.hand
            ? HAND_RANK[this.game.players[winner].round.hand]
            : 'none'
        }`
      )
    );

    this.gameLogger?.info({
      round: round.current,
      player: '',
      phase: 'finished',
      content: {
        type: 'finished',
        pot: round.pot,
        winner: round.winner,
        result,
      },
      game: structuredClone(this.game),
      pot: round.pot,
      minBetPoint: round.minBetPoint,
    });

    // ラウンド終了時のポイントを記録する
    const pointList = this.game.seatingOrder.map(
      (name) => this.game.players[name]?.point ?? 0
    );
    this.pointLogger?.info([round.current, ...pointList].join(','));

    // 全プレイヤーのラウンド終了時の処理を呼び出す
    this.players.forEach((playerInstance) => {
      if (!this.isAlive(playerInstance.name)) return;

      this.appLogger?.debug(
        GameService.formattedRoundLog(
          round.current,
          `Result. player: ${playerInstance.name}, hand: ${
            this.game.players[playerInstance.name]?.round.hand
          }, cards: ${JSON.stringify(
            this.game.players[playerInstance.name]?.round.cards
          )}, point: ${this.game.players[playerInstance.name]?.point}, status:${
            this.game.players[playerInstance.name]?.status
          }`
        )
      );

      playerInstance.end(this.generateSendInfo(round, playerInstance.name));
    });
  }

  /**
   * ラウンド終了時の処理
   * 次のラウンドのための準備をします。
   */
  private endPhase(): void {
    this.counter += 1;

    // 次のラウンドのために席順を回しておく
    const firstPlayer = this.players[0];
    const order = this.players.slice(1);
    this.players = order;
    this.players.push(firstPlayer);

    // 賭けポイント、手札、ステータスをリセットする
    Object.keys(this.game.players).forEach((name) => {
      if (!this.game.players[name]) return;

      this.game.players[name].round = {
        betPoint: 0,
        first: 0,
        second: 0,
        action: null,
        cards: [],
      };

      if (
        this.game.players[name].status === 'active' &&
        this.game.players[name].point < this.game.fee
      ) {
        this.game.players[name].status = 'out';
        this.appLogger?.info(
          GameService.formattedRoundLog(
            this.counter - 1,
            `======== ${name} is outed!! point: ${this.game.players[name].point} ========`
          )
        );
      }
    });

    if (this.activePlayers().length <= 1) this.game.status = 'finished';

    this.updateGame();
  }

  /**
   * テストのための関数
   * @returns
   */
  public getGameInfo(): Game {
    return this.game;
  }
}

export default GameService;
