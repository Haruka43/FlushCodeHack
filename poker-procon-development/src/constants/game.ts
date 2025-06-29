import type { Card } from '@/schema/card';
import { Hand } from '@/schema/game';

export const MIN_PLAYER = 4; // 参加者数
export const HAND_SIZE = 5;
export const DEFAULT_ROUND = 100;
export const DEFAULT_INITIAL_POINT = 20000;
export const DEFAULT_FEE = 200;

export const GAME_STATUS = {
  new: {
    label: '新規',
    color: 'brand100.300',
  },
  progress: {
    label: '進行中',
    color: 'brand100.200',
  },
  finished: {
    label: '終了',
    color: 'brand100.600',
  },
};

export const CARDS: Card[] = [
  { suit: 'Spades', number: 1 },
  { suit: 'Spades', number: 2 },
  { suit: 'Spades', number: 3 },
  { suit: 'Spades', number: 4 },
  { suit: 'Spades', number: 5 },
  { suit: 'Spades', number: 6 },
  { suit: 'Spades', number: 7 },
  { suit: 'Spades', number: 8 },
  { suit: 'Spades', number: 9 },
  { suit: 'Spades', number: 10 },
  { suit: 'Spades', number: 11 },
  { suit: 'Spades', number: 12 },
  { suit: 'Spades', number: 13 },
  { suit: 'Clubs', number: 1 },
  { suit: 'Clubs', number: 2 },
  { suit: 'Clubs', number: 3 },
  { suit: 'Clubs', number: 4 },
  { suit: 'Clubs', number: 5 },
  { suit: 'Clubs', number: 6 },
  { suit: 'Clubs', number: 7 },
  { suit: 'Clubs', number: 8 },
  { suit: 'Clubs', number: 9 },
  { suit: 'Clubs', number: 10 },
  { suit: 'Clubs', number: 11 },
  { suit: 'Clubs', number: 12 },
  { suit: 'Clubs', number: 13 },
  { suit: 'Diamonds', number: 1 },
  { suit: 'Diamonds', number: 2 },
  { suit: 'Diamonds', number: 3 },
  { suit: 'Diamonds', number: 4 },
  { suit: 'Diamonds', number: 5 },
  { suit: 'Diamonds', number: 6 },
  { suit: 'Diamonds', number: 7 },
  { suit: 'Diamonds', number: 8 },
  { suit: 'Diamonds', number: 9 },
  { suit: 'Diamonds', number: 10 },
  { suit: 'Diamonds', number: 11 },
  { suit: 'Diamonds', number: 12 },
  { suit: 'Diamonds', number: 13 },
  { suit: 'Hearts', number: 1 },
  { suit: 'Hearts', number: 2 },
  { suit: 'Hearts', number: 3 },
  { suit: 'Hearts', number: 4 },
  { suit: 'Hearts', number: 5 },
  { suit: 'Hearts', number: 6 },
  { suit: 'Hearts', number: 7 },
  { suit: 'Hearts', number: 8 },
  { suit: 'Hearts', number: 9 },
  { suit: 'Hearts', number: 10 },
  { suit: 'Hearts', number: 11 },
  { suit: 'Hearts', number: 12 },
  { suit: 'Hearts', number: 13 },
];

export const HAND_RANK: { [key in Hand]: string } = {
  [Hand.Drop]: 'Drop',
  [Hand.HighCard]: 'High Card',
  [Hand.OnePair]: 'One Pair',
  [Hand.TwoPair]: 'Two Pair',
  [Hand.ThreeOfAKind]: 'Three of a Kind',
  [Hand.Straight]: 'Straight',
  [Hand.Flush]: 'Flush',
  [Hand.FullHouse]: 'Full House',
  [Hand.FourOfAKind]: 'Four of a Kind',
  [Hand.StraightFlush]: 'Straight Flush',
  [Hand.RoyalStraightFlush]: 'Royal Straight Flush',
};
