import { DATA_FILE_PATH, LOG_FILE_PATH, SEQUENCE_FILE_NAME } from '@/constants';
import { ERROR_MESSAGES } from '@/constants/message';
import AdminService from '@/services/admin';
import { generateErrorObject } from '@/utils';

import { testGameInfoData } from '../data/game-info';
import { testLogList } from '../data/log-list';

const DATA_FILE_FULL_PATH = `${process.cwd()}/${DATA_FILE_PATH}`;
const LOG_FILE_FULL_PATH = `${process.cwd()}/${LOG_FILE_PATH}`;

jest.mock('@/services/file', () => {
  const originalModule = jest.requireActual('@/services/file');

  const readDir = jest.fn();
  readDir.mockImplementation((dir: string) => {
    if (dir === DATA_FILE_FULL_PATH) {
      return [
        '1.json',
        '2.json',
        '3.json',
        '4.json',
        '5.json',
        '6.json',
        '7.json',
        '8.json',
        '9.json',
        '10.json',
      ];
    }

    const logDirRegexp = new RegExp(`^${LOG_FILE_FULL_PATH}/\\d/game$`, 'g');
    if (dir.match(logDirRegexp)?.length) {
      return [
        '1.log',
        '2.log',
        '3.log',
        '4.log',
        '5.log',
        '6.log',
        '7.log',
        '8.log',
        '9.log',
        '10.log',
      ];
    }

    return [];
  });

  const readFile = jest.fn();
  readFile.mockImplementation((dir: string, file: string) => {
    // fileがシーケンスファイルの時、空文字列を返す（1件目想定）
    if (dir === DATA_FILE_FULL_PATH && file === SEQUENCE_FILE_NAME) return '';

    // fileが9999.jsonの時、空文字列を返す（存在しないゲーム想定）
    if (dir === DATA_FILE_FULL_PATH && file === '9998.json')
      throw new Error(
        JSON.stringify({
          status: 500,
          errors: [generateErrorObject('BC004')],
          target: { dir, file },
        })
      );

    // fileがシーケンスファイルではない時、ゲームデータを返す
    if (dir === DATA_FILE_FULL_PATH) return JSON.stringify(testGameInfoData);

    // dirがログファイルの時、ログデータを返す
    return testLogList.map((log) => JSON.stringify(log)).join('\n');
  });

  const writeFile = jest.fn();

  return {
    __esModule: true,
    ...originalModule,
    default: {
      ...originalModule.default,
      readDir,
      readFile,
      writeFile,
    },
  };
});

beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date('2024-05-01T00:00:00.000Z'));
});

afterAll(() => {
  jest.useRealTimers();
});

describe('admin service', () => {
  describe('findGames function', () => {
    test('[success] ゲーム一覧が取得できる', () => {
      const result = AdminService.findGames({ start: 0, end: 20 });
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
  });

  describe('createGame function', () => {
    test('[success] ゲームが作成できる', () => {
      const result = AdminService.createGame({
        players: ['Player1', 'Player2', 'Player3', 'Player4'],
        totalRound: 100,
        initialPoint: 20000,
        fee: 200,
      });
      expect(result.id).toBe('1');
      expect(result.status).toBe('new');
      expect(result.createdAt).toBe('2024-05-01T00:00:00.000Z');
      expect(result.players.Player1).toEqual({
        name: 'Player1',
        status: 'active',
        point: 20000,
        round: {
          betPoint: 0,
          first: 0,
          second: 0,
          cards: [],
          action: null,
        },
      });
      expect(result.players.Player2).toEqual({
        name: 'Player2',
        status: 'active',
        point: 20000,
        round: {
          betPoint: 0,
          first: 0,
          second: 0,
          cards: [],
          action: null,
        },
      });
      expect(result.players.Player3).toEqual({
        name: 'Player3',
        status: 'active',
        point: 20000,
        round: {
          betPoint: 0,
          first: 0,
          second: 0,
          cards: [],
          action: null,
        },
      });
      expect(result.players.Player4).toEqual({
        name: 'Player4',
        status: 'active',
        point: 20000,
        round: {
          betPoint: 0,
          first: 0,
          second: 0,
          cards: [],
          action: null,
        },
      });
      expect(result.seatingOrder).toHaveLength(4);
      expect(result.seatingOrder.sort((a, b) => (a > b ? 1 : -1))).toEqual([
        'Player1',
        'Player2',
        'Player3',
        'Player4',
      ]);
      expect(result.totalRound).toBe(100);
      expect(result.initialPoint).toBe(20000);
      expect(result.fee).toBe(200);
    });
  });

  describe('findLogById function', () => {
    test('[success] ラウンド一覧が取得できる', () => {
      const result = AdminService.findLogById('1', { start: 0, end: 20 });
      expect(result).toEqual({
        game: testGameInfoData,
        list: [
          { round: 1, logs: testLogList },
          { round: 2, logs: testLogList },
          { round: 3, logs: testLogList },
          { round: 4, logs: testLogList },
          { round: 5, logs: testLogList },
          { round: 6, logs: testLogList },
          { round: 7, logs: testLogList },
          { round: 8, logs: testLogList },
          { round: 9, logs: testLogList },
          { round: 10, logs: testLogList },
        ],
        total: 10,
        winRound: { Player1: 10, Player2: 0, Player3: 0, Player4: 0 },
      });
    });

    test('[failed] 存在しないゲームのラウンドを取得すると失敗する', () => {
      try {
        AdminService.findLogById('9999', { start: 0, end: 20 });
      } catch (e: any) {
        expect(e).toBeInstanceOf(Error);
        expect(JSON.parse(e.message)).toEqual({
          status: 500,
          errors: [
            {
              code: 'BC004',
              message: ERROR_MESSAGES.BC004,
              timestamp: '2024-05-01 09:00:00.000',
            },
          ],
          target: {
            dir: DATA_FILE_FULL_PATH,
            file: '9999.json',
          },
        });
      }
    });
  });

  describe('findRound function', () => {
    test('[success] ラウンド詳細が取得できる', () => {
      const result = AdminService.findRound('1', 1);
      expect(result).toEqual({
        round: 1,
        logs: testLogList,
      });
    });
  });

  describe('findPlayers function', () => {
    test('[success] プレイヤー一覧が取得できる', () => {
      const result = AdminService.findPlayers();
      expect(result.includes('DemoPlayer1')).toBeTruthy();
      expect(result.includes('DemoPlayer2')).toBeTruthy();
      expect(result.includes('DemoPlayer3')).toBeTruthy();
      expect(result.includes('DemoPlayer4')).toBeTruthy();
    });
  });
});
