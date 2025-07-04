import { getLogger } from '@/libs/logger.ts';
import { randomByNumber } from '@/utils/game.ts';

class JsPlayer {
  logger; // player logger
  id; // ゲームID
  name; // プレイヤー名
  round; // ラウンド
  win; // 勝数

  constructor(id, name) {
    this.logger = getLogger({ group: 'player', gameId: id, playerName: name });
    this.id = id;
    this.name = name;
    this.round = 0;
    this.win = 0;

    this.logger?.info(`Start game. ID: ${this.id}`);
  }

  /**
   * 出力するログの共通フォーマット
   * @param text
   * @returns
   */
  formattedLog(text) {
    return `<Round: ${this.round}>: ${text}`;
  }

  // =================================================================
  // ▼▼▼ 戦略ロジック ▼▼▼
  // =================================================================

  /**
   * 手札を評価し、強さを数値で返す関数 (役が強いほど高得点)
   * @param {Array<object>} cards 手札のカード [{ suit: 'Hearts', number: 1 }]
   * @returns {number} 手札の評価値
   */
  evaluateHand(cards) {
    if (!cards || cards.length !== 5) return 0;

    // number (1-13) をランク (2-14) に変換 (1=Ace=14)
    const toRank = (card) => (card.number === 1 ? 14 : card.number);
    const ranks = cards.map(toRank).sort((a, b) => a - b);
    const suits = cards.map((card) => card.suit);

    const isFlush = suits.every((s) => s === suits[0]);
    // A-5ストレート (A,2,3,4,5) の特殊判定
    const isA5Straight = JSON.stringify(ranks) === JSON.stringify([2, 3, 4, 5, 14]);
    const isNormalStraight = ranks.every((rank, i) => i === 0 || rank === ranks[i - 1] + 1);
    const isStraight = isNormalStraight || isA5Straight;

    // ランクごとの枚数をカウント
    const counts = ranks.reduce((acc, rank) => {
      acc[rank] = (acc[rank] || 0) + 1;
      return acc;
    }, {});
    const countsValues = Object.values(counts).sort((a, b) => b - a);

    let score = 0;
    // 役に応じて基本スコアを決定
    if (isStraight && isFlush && ranks.includes(14) && ranks.includes(13)) score = 900; // ロイヤルストレートフラッシュ
    else if (isStraight && isFlush) score = 800; // ストレートフラッシュ
    else if (countsValues[0] === 4) score = 700; // フォーカード
    else if (countsValues[0] === 3 && countsValues[1] === 2) score = 600; // フルハウス
    else if (isFlush) score = 500; // フラッシュ
    else if (isStraight) score = 400; // ストレート
    else if (countsValues[0] === 3) score = 300; // スリーカード
    else if (countsValues[0] === 2 && countsValues[1] === 2) score = 200; // ツーペア
    else if (countsValues[0] === 2) score = 100; // ワンペア

    // 役が同じ場合の強さを決めるため、カードランクでスコアを補正
    // 例：AAK53 は AAK42 より強い
    const tieBreaker = ranks
      .map((r) => String(r).padStart(2, '0'))
      .reverse()
      .join('');
    return score + parseFloat(`0.${tieBreaker}`);
  }

  /**
   * 手札と役の評価値に基づいて、交換するカードを決める
   * @param {Array<object>} cards 手札
   * @param {number} handStrength 手札の評価値
   * @returns {Array<boolean>} 交換するカード(true)としないカード(false)の配列
   */
  decideDraw(cards, handStrength) {
    // 役がストレート以上またはフルハウスの場合は交換しない
    if (handStrength >= 400) {
      return [false, false, false, false, false];
    }

    const toRank = (card) => (card.number === 1 ? 14 : card.number);

    // スリーカード: 3枚を残し、2枚交換
    if (handStrength >= 300) {
      const counts = cards.reduce((acc, card) => {
        const rank = toRank(card);
        acc[rank] = (acc[rank] || 0) + 1;
        return acc;
      }, {});
      const threeRank = Object.keys(counts).find((rank) => counts[rank] === 3);
      return cards.map((card) => toRank(card) !== parseInt(threeRank, 10));
    }

    // ツーペア: ペア2組を残し、1枚交換
    if (handStrength >= 200) {
      const counts = cards.reduce((acc, card) => {
        const rank = toRank(card);
        acc[rank] = (acc[rank] || 0) + 1;
        return acc;
      }, {});
      const singleRank = Object.keys(counts).find((rank) => counts[rank] === 1);
      return cards.map((card) => toRank(card) === parseInt(singleRank, 10));
    }

    // ワンペア: ペアを残し、3枚交換
    if (handStrength >= 100) {
      const counts = cards.reduce((acc, card) => {
        const rank = toRank(card);
        acc[rank] = (acc[rank] || 0) + 1;
        return acc;
      }, {});
      const pairRank = Object.keys(counts).find((rank) => counts[rank] === 2);
      return cards.map((card) => toRank(card) !== parseInt(pairRank, 10));
    }

    // 上記以外（ハイカードやドローを狙う手）
    // とりあえず一番強いカード1枚を残して4枚交換する戦略
    const ranks = cards.map(toRank);
    const maxRank = Math.max(...ranks);
    let kept = false;
    return cards.map((card) => {
      if (toRank(card) === maxRank && !kept) {
        kept = true;
        return false; // 交換しない
      }
      return true; // 交換する
    });
  }

  // =================================================================
  // ▼▼▼ 変更可能なメイン関数 ▼▼▼
  // =================================================================

  /**
   * ラウンド開始時に行う処理
   * @param {object} data GameInfo
   */
  startRound(data) {
    this.round = data.currentRound;
    this.logger?.info(this.formattedLog('Round start.'));

    Object.values(data.players).forEach((player) => {
      this.logger?.debug(
        this.formattedLog(`StartRound. ${player.name} info. status: ${player.status}, point: ${player.point}`)
      );
    });
  }

  /**
   * ベットするポイントを決定する
   * @param {object} data GameInfo
   * @returns {number} 追加で賭けるポイント数
   */
  decideBetPoint(data) {
    const self = data.players[this.name];
    if (!self) return -1; // 万が一自身が見つからなければドロップ

    const myHandStrength = this.evaluateHand(self.round.cards);
    this.logger?.info(
      this.formattedLog(`My hand: ${JSON.stringify(self.round.cards)}, Strength: ${myHandStrength.toFixed(2)}`)
    );

    const diff = data.minBetPoint - (self.round.betPoint ?? 0); // コールに必要な額
    const stack = self.point - diff; // コールした後に自由に使えるポイント

    // 強い手 (ツーペア以上) の場合
    if (myHandStrength >= 200) {
      // 誰もベットしていないなら、ポットの半分くらいをベット
      if (data.minBetPoint === 0) {
        return Math.floor(data.pot * 0.5);
      }
      // 誰かがベットしているなら、強気にレイズ
      // レイズ額は最低ベット額の2倍程度
      const raiseAmount = data.minBetPoint * 2;
      return Math.min(stack, raiseAmount); // 所持ポイントを超えないように
    }

    // 中くらいの手 (ワンペア) の場合
    if (myHandStrength >= 100) {
      // 相手のベット額が大きすぎる (ポットの半分以上) ならドロップ
      if (data.minBetPoint > data.pot * 0.5) {
        return -1;
      }
      // それ以外はコールに留める
      return 0;
    }

    // 弱い手 (ハイカード) の場合
    // 誰もベットしていなければチェック
    if (data.minBetPoint === 0) {
      return 0;
    }
    // 誰かがベットしていて、コール額が少額 (ポットの10%未満) なら運試しでコール
    if (diff < data.pot * 0.1) {
      return 0;
    }
    // それ以外は潔くドロップ
    return -1;
  }

  /**
   * 交換する手札を選択する
   * @param {object} data GameInfo
   * @returns {Array<boolean>}
   */
  drawCard(data) {
    const self = data.players[this.name];
    const cards = self?.round.cards ?? [];
    const myHandStrength = this.evaluateHand(cards);

    const drawDecision = this.decideDraw(cards, myHandStrength);

    this.logger?.info(
      this.formattedLog(
        `Phase: ${data.phase}. My hand strength: ${myHandStrength.toFixed(2)}. Draw decision: ${JSON.stringify(
          drawDecision
        )}`
      )
    );

    return drawDecision;
  }

  /**
   * ラウンド終了時に行う処理
   * @param {object} data GameInfo
   */
  endRound(data) {
    this.logger?.info(this.formattedLog(`Round end. winner: ${data.winner}`));

    if (data.winner === this.name) {
      this.win += 1;
      this.logger?.info(this.formattedLog(`I won! Total wins: ${this.win}`));
    }
  }

  // =================================================================
  // ▼▼▼ 変更禁止の呼び出し用関数 ▼▼▼
  // =================================================================

  start(data) {
    this.startRound(data);
  }

  bet(data) {
    return this.decideBetPoint(data);
  }

  draw(data) {
    return this.drawCard(data);
  }

  end(data) {
    this.endRound(data);
  }

  test() {
    return {
      id: this.id,
      name: this.name,
      round: this.round,
      win: this.win
    };
  }
}

export default JsPlayer;
