import type { Game } from '@/schema/game';

export const testGameInfoData: Game = {
  id: '10',
  status: 'progress',
  createdAt: '2024-04-15T18:52:10.296Z',
  players: {
    Player1: {
      name: 'Player1',
      status: 'active',
      point: 37600,
      round: {
        betPoint: 0,
        action: 'bet',
        cards: [
          {
            suit: 'Clubs',
            number: 1,
          },
          {
            suit: 'Diamonds',
            number: 7,
          },
          {
            suit: 'Spades',
            number: 6,
          },
          {
            suit: 'Spades',
            number: 9,
          },
          {
            suit: 'Clubs',
            number: 8,
          },
        ],
        hand: 1,
      },
    },
    Player2: {
      name: 'Player2',
      status: 'active',
      point: 17600,
      round: {
        betPoint: 0,
        action: 'bet',
        cards: [
          {
            suit: 'Hearts',
            number: 13,
          },
          {
            suit: 'Hearts',
            number: 1,
          },
          {
            suit: 'Spades',
            number: 5,
          },
          {
            suit: 'Clubs',
            number: 4,
          },
          {
            suit: 'Hearts',
            number: 4,
          },
        ],
        hand: 2,
      },
    },
    Player3: {
      name: 'Player3',
      status: 'active',
      point: 24800,
      round: {
        betPoint: 0,
        action: 'bet',
        cards: [
          {
            suit: 'Diamonds',
            number: 12,
          },
          {
            suit: 'Diamonds',
            number: 5,
          },
          {
            suit: 'Diamonds',
            number: 2,
          },
          {
            suit: 'Spades',
            number: 1,
          },
          {
            suit: 'Diamonds',
            number: 1,
          },
        ],
        hand: 2,
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
  seatingOrder: ['Player3', 'Player4', 'Player1', 'Player2'],
  startedAt: '2024-04-15T18:52:13.832Z',
};
