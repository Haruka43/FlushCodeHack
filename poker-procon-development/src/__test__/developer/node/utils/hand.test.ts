import { HAND_RANK } from '@/constants/game';
import { CardNumberRank, SuitRank } from '@/schema/card';
import { evaluateHand, isFlush, isStraight } from '@/utils/hand';

describe('hand utils', () => {
  describe('isFlush function', () => {
    test('フラッシュの判定になる', () => {
      expect(
        isFlush([
          {
            suit: SuitRank.Spades,
            number: CardNumberRank.Two,
          },
          {
            suit: SuitRank.Spades,
            number: CardNumberRank.Four,
          },
          {
            suit: SuitRank.Spades,
            number: CardNumberRank.Seven,
          },
          {
            suit: SuitRank.Spades,
            number: CardNumberRank.Nine,
          },
          {
            suit: SuitRank.Spades,
            number: CardNumberRank.King,
          },
        ])
      ).toBeTruthy();
    });

    test('フラッシュの判定にならない', () => {
      expect(
        isFlush([
          {
            suit: SuitRank.Spades,
            number: CardNumberRank.Two,
          },
          {
            suit: SuitRank.Spades,
            number: CardNumberRank.Four,
          },
          {
            suit: SuitRank.Spades,
            number: CardNumberRank.Seven,
          },
          {
            suit: SuitRank.Spades,
            number: CardNumberRank.Nine,
          },
          {
            suit: SuitRank.Clubs,
            number: CardNumberRank.King,
          },
        ])
      ).toBeFalsy();
    });
  });

  describe('isStraight function', () => {
    test('ストーレートの判定になる', () => {
      expect(
        isStraight([
          {
            suit: SuitRank.Spades,
            number: CardNumberRank.Two,
          },
          {
            suit: SuitRank.Hearts,
            number: CardNumberRank.Three,
          },
          {
            suit: SuitRank.Diamonds,
            number: CardNumberRank.Four,
          },
          {
            suit: SuitRank.Clubs,
            number: CardNumberRank.Five,
          },
          {
            suit: SuitRank.Spades,
            number: CardNumberRank.Six,
          },
        ])
      ).toBeTruthy();
    });

    test('ストーレートの判定にならない', () => {
      expect(
        isStraight([
          {
            suit: SuitRank.Spades,
            number: CardNumberRank.Two,
          },
          {
            suit: SuitRank.Hearts,
            number: CardNumberRank.Three,
          },
          {
            suit: SuitRank.Diamonds,
            number: CardNumberRank.Four,
          },
          {
            suit: SuitRank.Clubs,
            number: CardNumberRank.Five,
          },
          {
            suit: SuitRank.Spades,
            number: CardNumberRank.Seven,
          },
        ])
      ).toBeFalsy();
    });
  });

  describe('evaluateHand function', () => {
    test('Royal Straight Flush', () => {
      const hand = evaluateHand([
        {
          suit: 'Spades',
          number: 10,
        },
        {
          suit: 'Spades',
          number: 11,
        },
        {
          suit: 'Spades',
          number: 12,
        },
        {
          suit: 'Spades',
          number: 13,
        },
        {
          suit: 'Spades',
          number: 1,
        },
      ]);

      expect(hand).toBe(10);
      expect(HAND_RANK[hand]).toBe('Royal Straight Flush');
    });

    test('Straight Flush', () => {
      const hand = evaluateHand([
        {
          suit: 'Spades',
          number: 9,
        },
        {
          suit: 'Spades',
          number: 10,
        },
        {
          suit: 'Spades',
          number: 11,
        },
        {
          suit: 'Spades',
          number: 12,
        },
        {
          suit: 'Spades',
          number: 13,
        },
      ]);

      expect(hand).toBe(9);
      expect(HAND_RANK[hand]).toBe('Straight Flush');
    });

    test('Four of a Kind', () => {
      const hand = evaluateHand([
        {
          suit: 'Spades',
          number: 9,
        },
        {
          suit: 'Spades',
          number: 13,
        },
        {
          suit: 'Hearts',
          number: 13,
        },
        {
          suit: 'Diamonds',
          number: 13,
        },
        {
          suit: 'Clubs',
          number: 13,
        },
      ]);

      expect(hand).toBe(8);
      expect(HAND_RANK[hand]).toBe('Four of a Kind');
    });

    test('Full House', () => {
      const hand = evaluateHand([
        {
          suit: 'Spades',
          number: 9,
        },
        {
          suit: 'Spades',
          number: 9,
        },
        {
          suit: 'Hearts',
          number: 9,
        },
        {
          suit: 'Diamonds',
          number: 13,
        },
        {
          suit: 'Clubs',
          number: 13,
        },
      ]);

      expect(hand).toBe(7);
      expect(HAND_RANK[hand]).toBe('Full House');
    });

    test('Flush', () => {
      const hand = evaluateHand([
        {
          suit: 'Spades',
          number: 2,
        },
        {
          suit: 'Spades',
          number: 4,
        },
        {
          suit: 'Spades',
          number: 7,
        },
        {
          suit: 'Spades',
          number: 9,
        },
        {
          suit: 'Spades',
          number: 13,
        },
      ]);

      expect(hand).toBe(6);
      expect(HAND_RANK[hand]).toBe('Flush');
    });

    test('Straight', () => {
      const hand = evaluateHand([
        {
          suit: 'Spades',
          number: 2,
        },
        {
          suit: 'Hearts',
          number: 3,
        },
        {
          suit: 'Diamonds',
          number: 4,
        },
        {
          suit: 'Clubs',
          number: 5,
        },
        {
          suit: 'Spades',
          number: 6,
        },
      ]);

      expect(hand).toBe(5);
      expect(HAND_RANK[hand]).toBe('Straight');
    });

    test('Three of a Kind', () => {
      const hand = evaluateHand([
        {
          suit: 'Spades',
          number: 2,
        },
        {
          suit: 'Hearts',
          number: 2,
        },
        {
          suit: 'Diamonds',
          number: 2,
        },
        {
          suit: 'Clubs',
          number: 5,
        },
        {
          suit: 'Spades',
          number: 6,
        },
      ]);

      expect(hand).toBe(4);
      expect(HAND_RANK[hand]).toBe('Three of a Kind');
    });

    test('Two Pair', () => {
      const hand = evaluateHand([
        {
          suit: 'Spades',
          number: 2,
        },
        {
          suit: 'Hearts',
          number: 2,
        },
        {
          suit: 'Diamonds',
          number: 5,
        },
        {
          suit: 'Clubs',
          number: 5,
        },
        {
          suit: 'Spades',
          number: 6,
        },
      ]);

      expect(hand).toBe(3);
      expect(HAND_RANK[hand]).toBe('Two Pair');
    });

    test('One Pair', () => {
      const hand = evaluateHand([
        {
          suit: 'Spades',
          number: 2,
        },
        {
          suit: 'Hearts',
          number: 2,
        },
        {
          suit: 'Diamonds',
          number: 4,
        },
        {
          suit: 'Clubs',
          number: 5,
        },
        {
          suit: 'Spades',
          number: 6,
        },
      ]);

      expect(hand).toBe(2);
      expect(HAND_RANK[hand]).toBe('One Pair');
    });

    test('High Card', () => {
      const hand = evaluateHand([
        {
          suit: 'Spades',
          number: 2,
        },
        {
          suit: 'Hearts',
          number: 3,
        },
        {
          suit: 'Diamonds',
          number: 4,
        },
        {
          suit: 'Clubs',
          number: 5,
        },
        {
          suit: 'Spades',
          number: 7,
        },
      ]);

      expect(hand).toBe(1);
      expect(HAND_RANK[hand]).toBe('High Card');
    });

    test('Drop', () => {
      const hand = evaluateHand([]);

      expect(hand).toBe(0);
      expect(HAND_RANK[hand]).toBe('Drop');
    });
  });
});
