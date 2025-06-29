import {
  createGame,
  findGameById,
  findGames,
  findRound,
  startGame,
} from '@/clients/game';
import { SUCCESS_MESSAGES } from '@/constants/message';

import { testGameInfoData } from '../data/game-info';
import { testLogList } from '../data/log-list';

jest.mock('@/libs/axios', () => {
  const originalModule = jest.requireActual('@/libs/axios');

  const get = jest.fn();
  get
    .mockImplementationOnce(() => {
      return {
        data: {
          list: [
            testGameInfoData,
            testGameInfoData,
            testGameInfoData,
            testGameInfoData,
            testGameInfoData,
            testGameInfoData,
            testGameInfoData,
            testGameInfoData,
            testGameInfoData,
            testGameInfoData,
          ],
          total: 10,
        },
      };
    })
    .mockImplementationOnce(() => ({
      data: {
        game: testGameInfoData,
        list: { round: 1, logs: testLogList },
        total: 10,
      },
    }))
    .mockImplementation(() => ({
      data: {
        round: 1,
        logs: testLogList,
      },
    }));

  const post = jest.fn();
  post
    .mockImplementationOnce(() => ({
      data: testGameInfoData,
    }))
    .mockImplementationOnce(() => ({
      data: {
        id: 1,
        message: SUCCESS_MESSAGES.createGame,
      },
    }));

  return {
    __esModule: true,
    ...originalModule,
    default: {
      ...originalModule.default,
      get,
      post,
    },
  };
});

describe('game clients', () => {
  it('findGames', async () => {
    const result = await findGames({ page: 1, per_page: 20 });
    expect(result).toEqual({
      list: [
        testGameInfoData,
        testGameInfoData,
        testGameInfoData,
        testGameInfoData,
        testGameInfoData,
        testGameInfoData,
        testGameInfoData,
        testGameInfoData,
        testGameInfoData,
        testGameInfoData,
      ],
      total: 10,
    });
  });

  it('createGame', async () => {
    const result = await createGame({
      players: ['Player1', 'Player2', 'Player3', 'Player4'],
      totalRound: 100,
      initialPoint: 20000,
      fee: 200,
    });
    expect(result).toEqual(testGameInfoData);
  });

  it('findGameById', async () => {
    const result = await findGameById('1', { page: 1, per_page: 100 });
    expect(result).toEqual({
      game: testGameInfoData,
      list: { round: 1, logs: testLogList },
      total: 10,
    });
  });

  it('startGame', async () => {
    const result = await startGame('1');
    expect(result).toEqual({
      id: 1,
      message: SUCCESS_MESSAGES.createGame,
    });
  });

  it('findRound', async () => {
    const result = await findRound('1', 1);
    expect(result).toEqual({
      round: 1,
      logs: testLogList,
    });
  });
});
