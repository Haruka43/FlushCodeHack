export type Suit = 'Clubs' | 'Diamonds' | 'Hearts' | 'Spades';

export enum SuitRank {
  Clubs = 0,
  Diamonds,
  Hearts,
  Spades,
}

export type CardNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export enum CardNumberRank {
  Two = 2,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Jack,
  Queen,
  King,
  Ace,
}

export type Card = {
  number: CardNumber;
  suit: Suit;
};

export type RankCard = {
  number: CardNumberRank;
  suit: SuitRank;
};

export type CardSet<T> = [] | [T, T, T, T, T];
