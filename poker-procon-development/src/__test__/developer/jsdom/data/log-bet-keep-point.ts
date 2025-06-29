import type { Log } from '@/schema/log';

export const testLogBetKeepPoint: Log = {
  round: 10,
  player: 'Player1',
  phase: 'bet-1',
  content: { type: 'bet', amount: -1, action: 'drop', payPoint: 0 },
  game: {
    id: '10',
    status: 'progress',
    createdAt: '2024-04-22T12:06:55.706Z',
    players: {
      Player1: {
        name: 'Player1',
        status: 'active',
        point: 64746,
        round: {
          betPoint: 0,
          first: 0,
          second: 0,
          action: 'drop',
          cards: [],
        },
      },
      Player2: {
        name: 'Player2',
        status: 'active',
        point: 6256,
        round: {
          betPoint: 0,
          first: 0,
          second: 0,
          action: null,
          cards: [
            { suit: 'Diamonds', number: 6 },
            { suit: 'Clubs', number: 7 },
            { suit: 'Diamonds', number: 7 },
            { suit: 'Diamonds', number: 12 },
            { suit: 'Clubs', number: 1 },
          ],
        },
      },
      Player3: {
        name: 'Player3',
        status: 'out',
        point: 0,
        round: { betPoint: 0, first: 0, second: 0, action: null, cards: [] },
      },
      Player4: {
        name: 'Player4',
        status: 'active',
        point: 8084,
        round: {
          betPoint: 0,
          first: 0,
          second: 0,
          action: null,
          cards: [
            { suit: 'Diamonds', number: 3 },
            { suit: 'Hearts', number: 4 },
            { suit: 'Diamonds', number: 4 },
            { suit: 'Spades', number: 11 },
            { suit: 'Hearts', number: 11 },
          ],
        },
      },
    },
    totalRound: 100,
    initialPoint: 20000,
    fee: 200,
    seatingOrder: ['Player2', 'Player1', 'Player4', 'Player3'],
    startedAt: '2024-04-22T12:06:56.923Z',
  },
  pot: 600,
  minBetPoint: 0,
  createdAt: 1713787617161,
};
