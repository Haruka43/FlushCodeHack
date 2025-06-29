import type { CustomeError } from './common';
import type { Game } from './game';
import type { Log } from './log';

// A-001
export type FindGamesResponse = {
  list: Game[];
  total: number;
};

// A-002
export type CreateGameResponse = Game;

// A-003
export type FindGameByIdResponse = {
  game: Game;
  list: { round: number; logs: Log[] }[];
  total: number;
  winRound: {
    [key: string]: number;
  };
};

// A-004
export type StartGameResponse = {
  id: string;
  message: string;
};

// A-005
export type FindRoundResponse = {
  round: number;
  logs: Log[];
};

// B-001
export type FindPlayersResponse = {
  list: string[];
};

// Z-001
export type CustomeErrorResponse = {
  status: number;
  errors: CustomeError[];
};
