import { CARDS } from '@/constants/game';
import type { Card, CardSet } from '@/schema/card';
import { Hand } from '@/schema/game';
import type { PlayerStatus } from '@/schema/player';
import Round from '@/services/round';

import { testCards } from '../../jsdom/data/cards';

const cards: Card[] = [
  { suit: 'Spades', number: 1 },
  { suit: 'Spades', number: 2 },
  { suit: 'Spades', number: 3 },
  { suit: 'Spades', number: 4 },
  { suit: 'Spades', number: 5 },
];

describe('round service', () => {
  const round = new Round('1', 1, ['Player1', 'Player2', 'Player3', 'Player4']);
  describe('findGames function', () => {
    describe('constructor', () => {
      test('初期値', () => {
        expect(round.current).toBe(1);
        expect(round.phase).toBe('start');
        expect(round.order).toEqual([
          'Player1',
          'Player2',
          'Player3',
          'Player4',
        ]);
        expect(round.pot).toBe(0);
        expect(round.minBetPoint).toBe(0);
        expect(round.lastRaisePlayer).toBe('');
        expect(round.continueBet).toBe(true);
        expect(round.winner).toBe('');
      });
    });
  });

  describe('join function', () => {
    test('参加費を支払う', () => {
      const player = {
        name: 'Player1',
        status: 'active' as PlayerStatus,
        point: 20000,
        round: {
          betPoint: 0,
          first: 0,
          second: 0,
          cards: [] as CardSet<Card>,
          action: null,
        },
      };
      round.join(player, 200);
      expect(round.pot).toBe(200);
    });
  });

  describe('dealCard function', () => {
    round.shuffle(CARDS);

    test('カードを配る', () => {
      const newCards = round.dealCard(5);
      expect(newCards).toHaveLength(5);
    });

    test('山札が無くなった状態でカードを配る', () => {
      // drawフェーズの処理を使って、場札を増やし、山札を減らす
      round.draw([...CARDS].splice(0, 20), Array(20).fill(true));

      // この時点で山札・場札には47枚のカードがある（52枚 - 5枚）ので47枚配ると、山札が無くなる
      const newCards = round.dealCard(47);
      expect(newCards).toHaveLength(47);
    });
  });

  describe('collectCard function', () => {
    test('カードを回収する', () => {
      const player = {
        name: 'Player1',
        status: 'active' as PlayerStatus,
        point: 20000,
        round: {
          betPoint: 0,
          first: 0,
          second: 0,
          cards: cards as CardSet<Card>,
          action: null,
        },
      };
      round.collectCard(player);
    });
  });

  describe('preAction function', () => {
    test('賭けフェーズの前処理 (1回目）', () => {
      round.preAction();
      expect(round.phase).toBe('bet-1');
      expect(round.continueBet).toBe(true);
    });
  });

  describe('action function', () => {
    test('minBetPointが0の時に追加賭けポイントを0にするとcheck宣言をする', () => {
      const player = {
        name: 'Player1',
        status: 'active' as PlayerStatus,
        point: 19800,
        round: {
          betPoint: 0,
          first: 0,
          second: 0,
          cards: [] as CardSet<Card>,
          action: null,
        },
      };
      const result = round.action(player, 0);
      expect(result.action).toBe('check');
      expect(result.point).toBe(0);
      expect(round.minBetPoint).toBe(0);
      expect(round.lastRaisePlayer).toBe('');
      expect(round.pot).toBe(200);
    });

    test('minBetPointが0の時に賭けポイントを追加するとbetを宣言をする', () => {
      const player = {
        name: 'Player1',
        status: 'active' as PlayerStatus,
        point: 19800,
        round: {
          betPoint: 0,
          first: 0,
          second: 0,
          cards: [] as CardSet<Card>,
          action: null,
        },
      };
      const result = round.action(player, 200);
      expect(result.action).toBe('bet');
      expect(result.point).toBe(200);
      expect(round.minBetPoint).toBe(200);
      expect(round.lastRaisePlayer).toBe('Player1');
      expect(round.pot).toBe(400);
    });

    test('minBetPointが0ではない時追加の賭けポイントを0にするとcallを宣言する', () => {
      const player = {
        name: 'Player1',
        status: 'active' as PlayerStatus,
        point: 19600,
        round: {
          betPoint: 200,
          first: 200,
          second: 0,
          cards: [] as CardSet<Card>,
          action: null,
        },
      };
      const result = round.action(player, 0);
      expect(result.action).toBe('call');
      expect(result.point).toBe(0);
      expect(round.minBetPoint).toBe(200);
      // expect(round.lastRaisePlayer).toBe('Player1');
      expect(round.pot).toBe(400);
    });

    test('minBetPointが0ではない時に賭けポイントを追加するとraiseを宣言をする', () => {
      const player = {
        name: 'Player1',
        status: 'active' as PlayerStatus,
        point: 19600,
        round: {
          betPoint: 200,
          first: 200,
          second: 0,
          cards: [] as CardSet<Card>,
          action: null,
        },
      };
      const result = round.action(player, 200);
      expect(result.action).toBe('raise');
      expect(result.point).toBe(200);
      expect(round.minBetPoint).toBe(400);
      expect(round.lastRaisePlayer).toBe('Player1');
      expect(round.pot).toBe(600);
    });

    test('追加の賭けポイントにマイナス値を指定するとdropを宣言する', () => {
      const player = {
        name: 'Player1',
        status: 'active' as PlayerStatus,
        point: 19600,
        round: {
          betPoint: 400,
          first: 400,
          second: 0,
          cards: [] as CardSet<Card>,
          action: null,
        },
      };
      const result = round.action(player, -1);
      expect(result.action).toBe('drop');
      expect(result.point).toBe(0);
      expect(round.minBetPoint).toBe(400);
      // expect(round.lastRaisePlayer).toBe('Player1');
      expect(round.pot).toBe(600);
    });

    test('追加の賭けポイントに全ポイントを指定するとall-inを宣言する/minBetPoint(600pt) < 所持ポイント(19,600pt)', () => {
      const player = {
        name: 'Player1',
        status: 'active' as PlayerStatus,
        point: 19600,
        round: {
          betPoint: 400,
          first: 400,
          second: 0,
          cards: [] as CardSet<Card>,
          action: null,
        },
      };
      const result = round.action(player, 19600);
      expect(result.action).toBe('all-in');
      expect(result.point).toBe(19600);
      expect(round.minBetPoint).toBe(20000);
      expect(round.lastRaisePlayer).toBe('Player1');
      expect(round.pot).toBe(20200);
    });

    test('追加の賭けポイントに全ポイントを指定するとall-inを宣言する/minBetPoint(20,200pt) > 所持ポイント(10,000pt)', () => {
      const player = {
        name: 'Player2',
        status: 'active' as PlayerStatus,
        point: 10000,
        round: {
          betPoint: 0,
          first: 0,
          second: 0,
          cards: [] as CardSet<Card>,
          action: null,
        },
      };
      const result = round.action(player, 10000);
      expect(result.action).toBe('all-in');
      expect(result.point).toBe(10000);
      expect(round.minBetPoint).toBe(20000);
      expect(round.lastRaisePlayer).toBe('Player2');
      expect(round.pot).toBe(30200);
    });
  });

  describe('postAction function', () => {
    test('賭けフェーズの後処理（1回目）', () => {
      round.postAction();
      expect(round.phase).toBe('bet-1');
      expect(round.continueBet).toBe(false);
      expect(round.lastRaisePlayer).toBe('');
    });
  });

  describe('preDraw function', () => {
    test('交換フェーズの前処理（1回目）', () => {
      round.preDraw();
      expect(round.phase).toBe('draw-1');
    });
  });

  describe('draw function', () => {
    test('交換フェーズの処理（1回目）', () => {
      const { keep, discard, newCard } = round.draw(cards, [
        true,
        true,
        true,
        false,
        false,
      ]);
      expect(keep).toHaveLength(2);
      expect(discard).toHaveLength(3);
      expect(newCard).toHaveLength(3);
    });
  });

  describe('postDraw function', () => {
    test('交換フェーズの後処理（1回目）', () => {
      round.postDraw();
      expect(round.phase).toBe('bet-2');
    });
  });

  describe('preAction function', () => {
    test('賭けフェーズの前処理（2回目）', () => {
      round.preAction();
      expect(round.phase).toBe('bet-2');
      expect(round.continueBet).toBe(true);
    });
  });

  describe('preDraw function', () => {
    test('交換フェーズの前処理（2回目）', () => {
      round.preDraw();
      expect(round.phase).toBe('draw-2');
    });
  });

  describe('postDraw function', () => {
    test('交換フェーズの後処理（2回目）', () => {
      round.postDraw();
      expect(round.phase).toBe('result');
    });
  });

  describe('result function', () => {
    test('結果を判定し勝者を確定する', () => {
      round.result({
        Player1: {
          name: 'Player1',
          status: 'active',
          point: 20000,
          round: {
            betPoint: 0,
            first: 0,
            second: 0,
            cards: testCards[Hand.RoyalStraightFlush].A,
            action: 'call',
            hand: Hand.RoyalStraightFlush,
          },
        },
        Player2: {
          name: 'Player2',
          status: 'active',
          point: 20000,
          round: {
            betPoint: 0,
            first: 0,
            second: 0,
            cards: testCards[Hand.Straight].A,
            action: 'call',
            hand: Hand.Straight,
          },
        },
        Player3: {
          name: 'Player3',
          status: 'active',
          point: 20000,
          round: {
            betPoint: 0,
            first: 0,
            second: 0,
            cards: testCards[Hand.FullHouse].A,
            action: 'call',
            hand: Hand.FullHouse,
          },
        },
        Player4: {
          name: 'Player4',
          status: 'active',
          point: 20000,
          round: {
            betPoint: 0,
            first: 0,
            second: 0,
            cards: testCards[Hand.HighCard].A,
            action: 'call',
            hand: Hand.HighCard,
          },
        },
      });
      expect(round.winner).toEqual('Player1');
    });
  });

  describe('finish function', () => {
    test('ラウンドを終了する', () => {
      round.finish();
      expect(round.phase).toBe('finished');
    });
  });

  describe('isFinished function', () => {
    test('ラウンドが終了しているか', () => {
      expect(round.isFinished()).toBe(true);
    });
  });
});
