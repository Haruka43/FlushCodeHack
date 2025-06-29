import type { NextApiRequest } from 'next';

import ROUTE from '@/constants/route';
import {
  generateApiURL,
  generateErrorObject,
  generateScreenURL,
  parsePageInfo,
} from '@/utils';

describe('utils', () => {
  describe('generateScreenURL function', () => {
    test('パラメーター無し、クエリ無し', () => {
      const url = generateScreenURL(ROUTE.S_B01_001);
      expect(url).toBe('/games');
    });

    test('パラメーターあり、クエリ無し', () => {
      const url = generateScreenURL(ROUTE.S_B01_002, { id: 1 });
      expect(url).toBe('/games/1');
    });

    test('パラメーターあり、クエリあり', () => {
      const url = generateScreenURL(
        ROUTE.S_B01_002,
        { id: 1 },
        { page: 1, per_page: 20 }
      );
      expect(url).toBe('/games/1?page=1&per_page=20');
    });
  });

  describe('generateApiURL function', () => {
    test('クエリ無し', () => {
      const url = generateApiURL('/games/1');
      expect(url).toBe('/games/1');
    });

    test('クエリあり', () => {
      const url = generateApiURL('/games/1', { page: 1, per_page: 20 });
      expect(url).toBe('/games/1?page=1&per_page=20');
    });
  });

  describe('parsePageInfo function', () => {
    test('指定なし', () => {
      const url = parsePageInfo({
        query: {},
      } as unknown as NextApiRequest);
      expect(url).toEqual({ start: 0, end: 100 });
    });

    test('指定あり', () => {
      const url = parsePageInfo({
        query: { page: '2', per_page: '20' },
      } as unknown as NextApiRequest);
      expect(url).toEqual({ start: 20, end: 40 });
    });
  });

  describe('generateErrorObject function', () => {
    test('指定なし', () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-04-15 00:00:00.000').getTime());

      const url = generateErrorObject('BA001');
      expect(url).toEqual({
        code: 'BA001',
        message: '存在しないAPIです。',
        timestamp: '2024-04-15 00:00:00.000',
      });

      jest.useRealTimers();
    });
  });
});
