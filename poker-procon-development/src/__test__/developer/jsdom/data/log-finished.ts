import type { Log } from '@/schema/log';

export const testLogFinished: Log = {
  round: 10,
  player: '',
  phase: 'finished',
  content: {
    type: 'finished',
    pot: 7461,
    winner: 'Player1',
    result: {
      Player1: {
        cards: [
          { suit: 'Spades', number: 4 },
          { suit: 'Clubs', number: 4 },
          { suit: 'Clubs', number: 5 },
          { suit: 'Diamonds', number: 8 },
          { suit: 'Diamonds', number: 13 },
        ],
        hand: 2,
      },
      Player4: {
        cards: [
          { suit: 'Hearts', number: 2 },
          { suit: 'Clubs', number: 3 },
          { suit: 'Hearts', number: 8 },
          { suit: 'Clubs', number: 10 },
          { suit: 'Spades', number: 11 },
        ],
        hand: 1,
      },
      Player3: { cards: [], hand: 0 },
      Player2: {
        cards: [
          { suit: 'Clubs', number: 2 },
          { suit: 'Spades', number: 3 },
          { suit: 'Diamonds', number: 5 },
          { suit: 'Diamonds', number: 10 },
          { suit: 'Clubs', number: 12 },
        ],
        hand: 1,
      },
    },
  },
  game: {
    id: '10',
    status: 'progress',
    createdAt: '2024-04-22T12:06:55.706Z',
    players: {
      Player1: {
        name: 'Player1',
        status: 'active',
        point: 70234,
        round: {
          betPoint: 2287,
          action: 'call',
          cards: [
            { suit: 'Spades', number: 4 },
            { suit: 'Clubs', number: 4 },
            { suit: 'Clubs', number: 5 },
            { suit: 'Diamonds', number: 8 },
            { suit: 'Diamonds', number: 13 },
          ],
          hand: 2,
        },
      },
      Player2: {
        name: 'Player2',
        status: 'active',
        point: 3969,
        round: {
          betPoint: 2287,
          action: 'call',
          cards: [
            { suit: 'Clubs', number: 2 },
            { suit: 'Spades', number: 3 },
            { suit: 'Diamonds', number: 5 },
            { suit: 'Diamonds', number: 10 },
            { suit: 'Clubs', number: 12 },
          ],
          hand: 1,
        },
      },
      Player3: {
        name: 'Player3',
        status: 'out',
        point: 0,
        round: { betPoint: 0, action: null, cards: [] },
      },
      Player4: {
        name: 'Player4',
        status: 'active',
        point: 5797,
        round: {
          betPoint: 2287,
          action: 'raise',
          cards: [
            { suit: 'Hearts', number: 2 },
            { suit: 'Clubs', number: 3 },
            { suit: 'Hearts', number: 8 },
            { suit: 'Clubs', number: 10 },
            { suit: 'Spades', number: 11 },
          ],
          hand: 1,
        },
      },
    },
    totalRound: 100,
    initialPoint: 20000,
    fee: 200,
    seatingOrder: ['Player2', 'Player1', 'Player4', 'Player3'],
    startedAt: '2024-04-22T12:06:56.923Z',
  },
  pot: 7461,
  minBetPoint: 2287,
  createdAt: 1713787617170,
};
