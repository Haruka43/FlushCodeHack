import type { Card, CardSet } from './card';
import type { Action, Game, Hand, Phase } from './game';

export type LogGroup = 'application' | 'player' | 'game' | 'point';

export type LogContent =
  | {
      type: 'start';
      order: string[];
      join: { [key: string]: number };
    }
  | {
      type: 'bet';
      amount: number;
      action: Action;
      payPoint: number;
    }
  | {
      type: 'draw';
      exchange: boolean[];
      keep: Card[];
      discard: Card[];
      newCard: Card[];
      before: CardSet<Card>;
      after: CardSet<Card>;
    }
  | {
      type: 'finished';
      pot: number;
      winner: string;
      result: {
        [key: string]: {
          cards: CardSet<Card>;
          hand: Hand;
        };
      };
    };

export interface Log {
  round: number;
  player: string;
  phase: Phase;
  content: LogContent;
  game: Game;
  pot: number;
  minBetPoint: number;
  createdAt: number;
}
