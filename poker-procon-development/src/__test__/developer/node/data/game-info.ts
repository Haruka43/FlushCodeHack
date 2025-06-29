import type { GameInfo } from '@/schema/game';

export const testGameInfoData: GameInfo = {
  currentRound: 1,
  phase: 'start',
  order: ['Player1', 'Player2', 'Player3', 'Player4'],
  pot: 0,
  minBetPoint: 0,
  players: {
    Player1: {
      name: 'Player1',
      status: 'active',
      point: 37600,
      round: {
        betPoint: 0,
        action: 'bet',
        cards: [],
      },
    },
    Player2: {
      name: 'Player2',
      status: 'active',
      point: 17600,
      round: {
        betPoint: 0,
        action: 'bet',
        cards: [],
      },
    },
    Player3: {
      name: 'Player3',
      status: 'active',
      point: 24800,
      round: {
        betPoint: 0,
        action: 'bet',
        cards: [],
      },
    },
    Player4: {
      name: 'Player4',
      status: 'out',
      point: 0,
      round: {
        betPoint: 0,
        action: null,
        cards: [],
      },
    },
  },
  totalRound: 100,
  initialPoint: 20000,
  fee: 200,
};
