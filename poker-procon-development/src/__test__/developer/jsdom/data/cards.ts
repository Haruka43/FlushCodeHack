import type { Card, CardSet } from '@/schema/card';
import { Hand } from '@/schema/game';

type CardSetKye = 'A' | 'B1' | 'B2';
export const testCards: {
  [hand in Hand]: {
    [key in CardSetKye]: CardSet<Card>;
  };
} = {
  [Hand.RoyalStraightFlush]: {
    A: [
      { suit: 'Spades', number: 10 },
      { suit: 'Spades', number: 11 },
      { suit: 'Spades', number: 12 },
      { suit: 'Spades', number: 13 },
      { suit: 'Spades', number: 1 },
    ], // ロイヤルストレートフラッシュ(10♠ J♠ Q♠ K♠ A♠)
    B1: [
      { suit: 'Clubs', number: 10 },
      { suit: 'Clubs', number: 11 },
      { suit: 'Clubs', number: 12 },
      { suit: 'Clubs', number: 13 },
      { suit: 'Clubs', number: 1 },
    ], // ロイヤルストレートフラッシュ(10♣ J♣ Q♣ K♣ A♣)
    B2: [], // 使用しない
  },
  [Hand.StraightFlush]: {
    A: [
      { suit: 'Spades', number: 9 },
      { suit: 'Spades', number: 10 },
      { suit: 'Spades', number: 11 },
      { suit: 'Spades', number: 12 },
      { suit: 'Spades', number: 13 },
    ], // ストレートフラッシュ(9♠ 10♠ J♠ Q♠ K♠)
    B1: [
      { suit: 'Spades', number: 4 },
      { suit: 'Spades', number: 5 },
      { suit: 'Spades', number: 6 },
      { suit: 'Spades', number: 7 },
      { suit: 'Spades', number: 8 },
    ], // ストレートフラッシュ(4♠ 5♠ 6♠ 7♠ 8♠)
    B2: [
      { suit: 'Diamonds', number: 9 },
      { suit: 'Diamonds', number: 10 },
      { suit: 'Diamonds', number: 11 },
      { suit: 'Diamonds', number: 12 },
      { suit: 'Diamonds', number: 13 },
    ], // ストレートフラッシュ(9♦ 10♦ J♦ Q♦ K♦)
  },
  [Hand.FourOfAKind]: {
    A: [
      { suit: 'Clubs', number: 4 },
      { suit: 'Spades', number: 13 },
      { suit: 'Hearts', number: 13 },
      { suit: 'Diamonds', number: 13 },
      { suit: 'Clubs', number: 13 },
    ], // フォーカード(4♣ K♠ K♥ K♦ K♣)
    B1: [
      { suit: 'Spades', number: 7 },
      { suit: 'Hearts', number: 7 },
      { suit: 'Diamonds', number: 7 },
      { suit: 'Clubs', number: 7 },
      { suit: 'Clubs', number: 12 },
    ], // フォーカード(7♠ 7♦ 7♥ 7♣ Q♣)
    B2: [], // 使用しない
  },
  [Hand.FullHouse]: {
    A: [
      { suit: 'Spades', number: 12 },
      { suit: 'Hearts', number: 12 },
      { suit: 'Spades', number: 13 },
      { suit: 'Hearts', number: 13 },
      { suit: 'Diamonds', number: 13 },
    ], // フルハウス(Q♠ Q♥ K♠ K♠ K♦)
    B1: [
      { suit: 'Spades', number: 2 },
      { suit: 'Hearts', number: 2 },
      { suit: 'Spades', number: 3 },
      { suit: 'Hearts', number: 3 },
      { suit: 'Diamonds', number: 3 },
    ], // フルハウス(2♠ 2♦ 3♦ 3♠ 3♥)
    B2: [], // 使用しない
  },
  [Hand.Flush]: {
    A: [
      { suit: 'Spades', number: 2 },
      { suit: 'Spades', number: 6 },
      { suit: 'Spades', number: 9 },
      { suit: 'Spades', number: 13 },
      { suit: 'Spades', number: 1 },
    ], // フラッシュ(2♠ 6♠ 9♠ K♠ A♠)
    B1: [
      { suit: 'Clubs', number: 3 },
      { suit: 'Clubs', number: 4 },
      { suit: 'Clubs', number: 5 },
      { suit: 'Clubs', number: 7 },
      { suit: 'Clubs', number: 8 },
    ], // フラッシュ(3♠ 4♠ 5♠ 7♠ 8♠)
    B2: [
      { suit: 'Clubs', number: 2 },
      { suit: 'Clubs', number: 6 },
      { suit: 'Clubs', number: 9 },
      { suit: 'Clubs', number: 13 },
      { suit: 'Clubs', number: 1 },
    ], // フラッシュ(2♣ 6♣ 9♣ K♣ A♣)
  },
  [Hand.Straight]: {
    A: [
      { suit: 'Spades', number: 10 },
      { suit: 'Spades', number: 11 },
      { suit: 'Spades', number: 12 },
      { suit: 'Spades', number: 13 },
      { suit: 'Hearts', number: 1 },
    ], // ストーレート(10♠ J♠ Q♠ K♠ A♥)
    B1: [
      { suit: 'Spades', number: 4 },
      { suit: 'Spades', number: 5 },
      { suit: 'Spades', number: 6 },
      { suit: 'Spades', number: 7 },
      { suit: 'Hearts', number: 8 },
    ], // フラッシュ(4♠ 5♦ 6♥ 7♣ 8♦)
    B2: [
      { suit: 'Diamonds', number: 10 },
      { suit: 'Diamonds', number: 11 },
      { suit: 'Diamonds', number: 12 },
      { suit: 'Diamonds', number: 13 },
      { suit: 'Clubs', number: 1 },
    ], // フラッシュ(10♦ J♦ Q♦ K♦ A♣)
  },
  [Hand.ThreeOfAKind]: {
    A: [
      { suit: 'Spades', number: 5 },
      { suit: 'Spades', number: 6 },
      { suit: 'Spades', number: 8 },
      { suit: 'Hearts', number: 8 },
      { suit: 'Diamonds', number: 8 },
    ], // スリーカード(5♠ 6♠ 8♠ 8♥ 8♦)
    B1: [
      { suit: 'Spades', number: 5 },
      { suit: 'Spades', number: 6 },
      { suit: 'Spades', number: 7 },
      { suit: 'Hearts', number: 7 },
      { suit: 'Diamonds', number: 7 },
    ], // スリーカード(3♠ 4♠ 7♠ 7♥ 7♦)
    B2: [], // 使用しない
  },
  [Hand.TwoPair]: {
    A: [
      { suit: 'Spades', number: 3 },
      { suit: 'Spades', number: 5 },
      { suit: 'Hearts', number: 5 },
      { suit: 'Spades', number: 7 },
      { suit: 'Hearts', number: 7 },
    ], // ツーペア(3♠ 5♠ 5♥ 7♠ 7♥)
    B1: [
      { suit: 'Spades', number: 2 },
      { suit: 'Spades', number: 4 },
      { suit: 'Hearts', number: 4 },
      { suit: 'Spades', number: 6 },
      { suit: 'Hearts', number: 6 },
    ], // ツーペア(2♠ 4♠ 4♥ 6♠ 6♥)
    B2: [
      { suit: 'Hearts', number: 3 },
      { suit: 'Diamonds', number: 5 },
      { suit: 'Clubs', number: 5 },
      { suit: 'Diamonds', number: 7 },
      { suit: 'Clubs', number: 7 },
    ], // ツーペア(3♥ 5♦ 5♣ 7♦ 7♣)
  },
  [Hand.OnePair]: {
    A: [
      { suit: 'Spades', number: 6 },
      { suit: 'Hearts', number: 6 },
      { suit: 'Spades', number: 7 },
      { suit: 'Diamonds', number: 8 },
      { suit: 'Clubs', number: 9 },
    ], // ワンペア(6♠ 6♥ 7♠ 8♦ 9♣)
    B1: [
      { suit: 'Spades', number: 4 },
      { suit: 'Hearts', number: 4 },
      { suit: 'Spades', number: 9 },
      { suit: 'Diamonds', number: 10 },
      { suit: 'Clubs', number: 11 },
    ], // ワンペア(4♠ 4♥ 9♥ 10♦ J♣)
    B2: [
      { suit: 'Clubs', number: 6 },
      { suit: 'Diamonds', number: 6 },
      { suit: 'Diamonds', number: 7 },
      { suit: 'Clubs', number: 8 },
      { suit: 'Spades', number: 9 },
    ], // ワンペア(6♣ 6♦ 7♦ 8♣ 9♠)
  },
  [Hand.HighCard]: {
    A: [
      { suit: 'Diamonds', number: 2 },
      { suit: 'Spades', number: 4 },
      { suit: 'Clubs', number: 6 },
      { suit: 'Hearts', number: 7 },
      { suit: 'Spades', number: 1 },
    ], // ハイカード(2♦ 4♠ 6♣ 7♥ A♠)
    B1: [
      { suit: 'Clubs', number: 2 },
      { suit: 'Hearts', number: 4 },
      { suit: 'Diamonds', number: 6 },
      { suit: 'Clubs', number: 7 },
      { suit: 'Spades', number: 13 },
    ], // ハイカード(2♣ 4♥ 6♦ 7♣ K♠)
    B2: [
      { suit: 'Clubs', number: 2 },
      { suit: 'Hearts', number: 4 },
      { suit: 'Diamonds', number: 6 },
      { suit: 'Clubs', number: 7 },
      { suit: 'Hearts', number: 1 },
    ], // ハイカード(2♣ 4♥ 6♦ 7♣ A♥)
  },
  [Hand.Drop]: {
    A: [], // 使用しない
    B1: [], // 使用しない
    B2: [], // 使用しない
  },
};
