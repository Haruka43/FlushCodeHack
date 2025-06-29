import type { Player } from './player';

export type GameStatus = 'new' | 'progress' | 'finished';

export type Phase =
  | 'start'
  | 'join'
  | 'bet-1'
  | 'draw-1'
  | 'bet-2'
  | 'draw-2'
  | 'result'
  | 'finished';

export type Game = {
  id: string;
  status: GameStatus;
  totalRound: number;
  initialPoint: number;
  fee: number;
  players: {
    [key: string]: Player;
  };
  seatingOrder: string[];
  createdAt: string;
  startedAt?: string;
};

export type GameInfo = Pick<
  Game,
  'totalRound' | 'initialPoint' | 'fee' | 'players'
> & {
  currentRound: number;
  phase: Phase;
  order: string[];
  pot: number;
  minBetPoint: number;
  players: {
    [key: string]: Player;
  };
  winner?: string;
};

export type Action =
  | null
  | 'check'
  | 'bet'
  | 'raise'
  | 'call'
  | 'all-in'
  | 'drop';

export enum Hand {
  Drop = 0,
  HighCard,
  OnePair,
  TwoPair,
  ThreeOfAKind,
  Straight,
  Flush,
  FullHouse,
  FourOfAKind,
  StraightFlush,
  RoyalStraightFlush,
}

export type PayReason = Action | 'fee';
