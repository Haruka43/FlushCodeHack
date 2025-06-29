import type winston from 'winston';

import { getLogger } from '@/libs/logger';
import type { Card } from '@/schema/card';
import type { Action, PayReason, Phase } from '@/schema/game';
import type { Player } from '@/schema/player';
import { callActionByPoint, compareCards, shuffleArray } from '@/utils/game';
import { convertRankCard } from '@/utils/hand';

class Round {
  public readonly current: number; // 現在のラウンド数

  public phase: Phase; // フェーズ

  public order: string[]; // ラウンドのプレイ順≠席順（席順はゲーム生成時に固定。gaem.orderで管理)

  private desk: Card[]; // 山札

  private discardPile: Card[]; // 捨札

  public pot: number; // 総賭けポイント

  public minBetPoint: number; // 最低賭けポイント

  public lastRaisePlayer: string; // 最後にraiseしたプレイヤーコード

  public continueBet: boolean; // 賭けフェーズの進行フラグ

  public winner: string; // 勝者

  private readonly appLogger: winston.Logger | null | undefined; // application logger

  constructor(id: string, round: number, order: string[]) {
    this.appLogger = getLogger({ group: 'application', gameId: id });

    this.current = round;
    this.phase = 'start';
    this.order = order;
    this.desk = [];
    this.discardPile = [];
    this.pot = 0;
    this.minBetPoint = 0;
    this.lastRaisePlayer = '';
    this.continueBet = true;
    this.winner = '';
  }

  /**
   * 出力するログの共通フォーマット
   * @param text
   * @returns
   */
  private formattedLog(text: string): string {
    return `<Round: ${this.current}>: ${text}`;
  }

  /**
   * 掛けポイントを徴収する
   * @param name
   * @param reason
   * @param amount
   * @param difference
   */
  private receivePoint(
    name: string,
    reason: PayReason,
    amount: number,
    difference: number
  ): void {
    const before = this.pot;
    this.pot += amount + difference;
    this.appLogger?.debug(
      this.formattedLog(
        `Add bet point. player: ${name}, reason: ${reason}, amount: ${amount}, difference: ${difference}, beforePot: ${before}, afterPot: ${this.pot}, minBetPoint: ${this.minBetPoint}`
      )
    );
  }

  /**
   * 参加費を支払う
   * @param player
   * @param fee
   */
  public join(player: Player, fee: number): void {
    this.receivePoint(player.name, 'fee', fee, 0);
  }

  /**
   * 山札をシャッフルする
   * @param cards
   */
  public shuffle(cards: Card[]): void {
    this.desk = shuffleArray(cards);
    this.appLogger?.debug(
      this.formattedLog(
        `Desk after shuffle. target cards: ${JSON.stringify(
          cards
        )}, shuffled desk: ${JSON.stringify(this.desk)}`
      )
    );
  }

  /**
   * カードを配る
   * @param num
   * @returns
   */
  public dealCard(num: number): Card[] {
    const cards = [];
    for (let i = 0; i < num; i += 1) {
      if (!this.desk.length) {
        this.desk = this.desk.concat(this.discardPile);
        this.shuffle(this.desk);
      }

      const card = this.desk.pop();
      if (card) cards.push(card);

      this.appLogger?.debug(
        this.formattedLog(`Deal cards. cards: ${JSON.stringify(card)}`)
      );
    }

    return cards;
  }

  /**
   * カードを回収する
   * @param player
   * @returns
   */
  public collectCard(player: Player): void {
    this.discardPile = this.discardPile.concat(player.round.cards);
  }

  /**
   * 賭けフェーズの前処理
   */
  public preAction() {
    this.phase = this.minBetPoint ? 'bet-2' : 'bet-1';
    this.appLogger?.debug(this.formattedLog(`Pre bet process. ${this.phase}`));

    this.continueBet = true;
  }

  /**
   * プレイヤーの宣言に応じた処理を行う
   * @param player アクションしたプレイヤー
   * @param amount 追加する賭けポイント
   * @returns
   */
  public action(
    player: Player,
    amount: number
  ): { action: Action; point: number } {
    const action = callActionByPoint(
      player.point,
      this.minBetPoint,
      player.round.betPoint,
      amount
    ); // 宣言するアクション
    const difference = this.minBetPoint - (player.round.betPoint || 0); // 未払い分

    switch (action) {
      case 'bet':
      case 'raise': {
        this.lastRaisePlayer = player.name;
        this.minBetPoint += amount;
        this.receivePoint(player.name, action, amount, difference); // 既に賭けているポインを差し引いて総賭けポイントを更新する
        return {
          action,
          point: difference + amount,
        };
      }
      case 'check':
      case 'call': {
        this.receivePoint(player.name, action, 0, difference); // 既に賭けているポインを差し引いて総賭けポイントを更新する
        return {
          action,
          point: difference,
        };
      }
      case 'all-in': {
        this.lastRaisePlayer = player.name;
        // ラウンド中の累計賭けポイントが最低賭けポイントを上回る場合は、最低賭けポイントを更新する
        this.minBetPoint = Math.max(
          this.minBetPoint,
          player.round.betPoint + amount
        );
        this.receivePoint(player.name, action, player.point, 0);
        return { action, point: player.point };
      }
      default: {
        return { action, point: 0 };
      }
    }
  }

  /**
   * 賭けフェーズの後処理
   */
  public postAction(): void {
    this.appLogger?.debug(
      this.formattedLog(
        `Post bet process. ${this.phase} Min bet point ${this.minBetPoint}. lastRaisePlayer: ${this.lastRaisePlayer}`
      )
    );

    this.continueBet = false;
    this.lastRaisePlayer = '';
  }

  /**
   * 交換フェーズの前処理
   */
  public preDraw() {
    this.phase = this.phase === 'bet-1' ? 'draw-1' : 'draw-2';
    this.appLogger?.debug(this.formattedLog(`Pre draw process. ${this.phase}`));
  }

  /**
   * 交換フェーズの処理
   * @param cards 手札
   * @param exchange 交換対象
   */
  public draw(
    cards: Card[],
    exchange: boolean[]
  ): { keep: Card[]; discard: Card[]; newCard: Card[] } {
    this.appLogger?.debug(
      this.formattedLog(
        `Card exchange. cards: ${JSON.stringify(cards)} exchange: ${exchange}`
      )
    );

    const keep = cards.filter((_, i) => !exchange[i]);
    const discard = cards.filter((_, i) => exchange[i]);
    this.discardPile = this.discardPile.concat(discard);
    // カードをランク順に並べる（Aが右端）
    const newCard = this.dealCard(discard.length).sort(
      (a, b) => convertRankCard(a).number - convertRankCard(b).number
    );
    return { keep, discard, newCard };
  }

  /**
   * 交換フェーズの後処理
   */
  public postDraw(): void {
    this.appLogger?.debug(
      this.formattedLog(`Post draw process. ${this.phase}`)
    );

    this.phase = this.phase === 'draw-1' ? 'bet-2' : 'result';
  }

  /**
   * 勝負フェーズの処理
   */
  public result(players: { [key: string]: Player }): void {
    this.winner = compareCards(players);
  }

  public finish(): void {
    this.phase = 'finished';
    this.appLogger?.info(this.formattedLog('Round force end.'));
  }

  public isFinished(): boolean {
    return this.phase === 'finished';
  }
}

export default Round;
