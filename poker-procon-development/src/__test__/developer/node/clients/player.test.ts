import { findPlayers } from '@/clients/player';

jest.mock('axios', () => {
  const originalModule = jest.requireActual('axios');

  const get = jest.fn();
  get.mockImplementationOnce(() => ({
    data: {
      list: ['Player1', 'Player2', 'Player3', 'Player4'],
    },
  }));

  return {
    __esModule: true,
    ...originalModule,
    default: {
      ...originalModule.default,
      get,
    },
  };
});

describe('player clients', () => {
  it('findPlayers', async () => {
    const result = await findPlayers();
    expect(result).toEqual({
      list: ['Player1', 'Player2', 'Player3', 'Player4'],
    });
  });
});
