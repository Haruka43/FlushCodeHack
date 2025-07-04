import { getLogger } from '@/libs/logger.ts';

class JsPlayer {
  logger;
  id;
  name;
  round;
  win;
  betUnit; // ★★★ エラー修正のため追加

  constructor(id, name) {
    this.logger = getLogger({ group: 'player', gameId: id, playerName: name });
    this.id = id;
    this.name = name;
    this.round = 0;
    this.win = 0;
    this.betUnit = 0; // ★★★ エラー修正のため追加

    this.logger?.info(`Start game. ID: ${this.id}`);
  }

  formattedLog(text) {
    return `<Round: ${this.round}>: ${text}`;
  }

  evaluateHand(cards) {
    if (!cards || cards.length !== 5) return 0;
    const toRank = (card) => (card.number === 1 ? 14 : card.number);
    const ranks = cards.map(toRank).sort((a, b) => a - b);
    const suits = cards.map((card) => card.suit);
    const isFlush = suits.every((s) => s === suits[0]);
    const isA5Straight = JSON.stringify(ranks) === JSON.stringify([2, 3, 4, 5, 14]);
    const isNormalStraight = ranks.every((rank, i) => i === 0 || rank === ranks[i - 1] + 1);
    const isStraight = isNormalStraight || isA5Straight;
    const counts = ranks.reduce((acc, rank) => {
      acc[rank] = (acc[rank] || 0) + 1;
      return acc;
    }, {});
    const countsValues = Object.values(counts).sort((a, b) => b - a);
    let score = 0;
    if (isStraight && isFlush && ranks.includes(14) && ranks.includes(13)) score = 900;
    else if (isStraight && isFlush) score = 800;
    else if (countsValues[0] === 4) score = 700;
    else if (countsValues[0] === 3 && countsValues[1] === 2) score = 600;
    else if (isFlush) score = 500;
    else if (isStraight) score = 400;
    else if (countsValues[0] === 3) score = 300;
    else if (countsValues[0] === 2 && countsValues[1] === 2) score = 200;
    else if (countsValues[0] === 2) score = 100;
    const tieBreaker = ranks
      .map((r) => String(r).padStart(2, '0'))
      .reverse()
      .join('');
    return score + parseFloat(`0.${tieBreaker}`);
  }

  decideDraw(cards, handStrength) {
    if (handStrength >= 400) return [false, false, false, false, false];
    const toRank = (card) => (card.number === 1 ? 14 : card.number);
    if (handStrength >= 300) {
      const counts = cards.reduce((acc, card) => {
        const rank = toRank(card);
        acc[rank] = (acc[rank] || 0) + 1;
        return acc;
      }, {});
      const threeRank = Object.keys(counts).find((rank) => counts[rank] === 3);
      return cards.map((card) => toRank(card) !== parseInt(threeRank, 10));
    }
    if (handStrength >= 200) {
      const counts = cards.reduce((acc, card) => {
        const rank = toRank(card);
        acc[rank] = (acc[rank] || 0) + 1;
        return acc;
      }, {});
      const singleRank = Object.keys(counts).find((rank) => counts[rank] === 1);
      return cards.map((card) => toRank(card) === parseInt(singleRank, 10));
    }
    if (handStrength >= 100) {
      const counts = cards.reduce((acc, card) => {
        const rank = toRank(card);
        acc[rank] = (acc[rank] || 0) + 1;
        return acc;
      }, {});
      const pairRank = Object.keys(counts).find((rank) => counts[rank] === 2);
      return cards.map((card) => toRank(card) !== parseInt(pairRank, 10));
    }
    const ranks = cards.map(toRank);
    const maxRank = Math.max(...ranks);
    let kept = false;
    return cards.map((card) => {
      if (toRank(card) === maxRank && !kept) {
        kept = true;
        return false;
      }
      return true;
    });
  }

  startRound(data) {
    this.round = data.currentRound;
    this.logger?.info(this.formattedLog('Round start.'));
  }

  decideBetPoint(data) {
    const self = data.players[this.name];
    if (!self) return -1;
    const myHandStrength = this.evaluateHand(self.round.cards);
    this.logger?.info(
      this.formattedLog(`My hand: ${JSON.stringify(self.round.cards)}, Strength: ${myHandStrength.toFixed(2)}`)
    );
    const diff = data.minBetPoint - (self.round.betPoint ?? 0);
    const stack = self.point - diff;
    if (myHandStrength >= 200) {
      if (data.minBetPoint === 0) return Math.floor(data.pot * 0.5);
      const raiseAmount = data.minBetPoint * 2;
      return Math.min(stack, raiseAmount);
    }
    if (myHandStrength >= 100) {
      if (data.minBetPoint > data.pot * 0.5) return -1;
      return 0;
    }
    if (data.minBetPoint === 0) return 0;
    if (diff < data.pot * 0.1) return 0;
    return -1;
  }

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

  endRound(data) {
    this.logger?.info(this.formattedLog(`Round end. winner: ${data.winner}`));
    if (data.winner === this.name) {
      this.win += 1;
      this.logger?.info(this.formattedLog(`I won! Total wins: ${this.win}`));
    }
  }

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
      win: this.win,
      betUnit: this.betUnit // ★★★ エラー修正のため追加
    };
  }
}

export default JsPlayer;
