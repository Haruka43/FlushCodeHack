import type { Game } from '@/schema/game';

export const testGameData: Game = {
  id: '1',
  status: 'new',
  createdAt: '2024-05-01T10:15:19.019Z',
  players: {
    DemoPlayer1: {
      name: 'DemoPlayer1',
      status: 'active',
      point: 37600,
      round: {
        betPoint: 0,
        action: 'bet',
        cards: [],
      },
    },
    DemoPlayer2: {
      name: 'DemoPlayer2',
      status: 'active',
      point: 17600,
      round: {
        betPoint: 0,
        action: 'bet',
        cards: [],
      },
    },
    DemoPlayer3: {
      name: 'DemoPlayer3',
      status: 'active',
      point: 24800,
      round: {
        betPoint: 0,
        action: 'bet',
        cards: [],
      },
    },
    DemoPlayer4: {
      name: 'DemoPlayer4',
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
  seatingOrder: ['DemoPlayer1', 'DemoPlayer2', 'DemoPlayer3', 'DemoPlayer4'],
  startedAt: '2024-05-01T10:52:16.257Z',
};
