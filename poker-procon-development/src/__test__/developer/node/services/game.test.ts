import GameService from '@/services/game';

import { testGameData } from '../data/game';

jest.mock('@/services/file', () => {
  const originalModule = jest.requireActual('@/services/file');

  const readFile = jest.fn();
  readFile.mockImplementation(() => JSON.stringify(testGameData));

  const writeFile = jest.fn();

  return {
    __esModule: true,
    ...originalModule,
    default: {
      ...originalModule.default,
      readFile,
      writeFile,
    },
  };
});

describe('game service', () => {
  test('一連のゲームが実行できる', () => {
    const game = new GameService('1');
    game.start();
    const gameData = game.getGameInfo();

    expect(gameData.status).toBe('finished');
  });
});
