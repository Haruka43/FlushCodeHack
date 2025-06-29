import type { Card, CardSet } from './card';
import type { Action, Hand } from './game';

export type PlayerStatus = 'active' | 'out';

export interface Player {
  name: string;
  status: PlayerStatus;
  point: number;
  round: {
    betPoint: number;
    first: number;
    second: number;
    cards: CardSet<Card>;
    action: Action;
    hand?: Hand;
  };
}
