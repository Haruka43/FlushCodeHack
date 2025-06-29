import fsPromises from 'node:fs/promises';

import fs from 'fs';
import path from 'path';

import { DATA_FILE_PATH, SEQUENCE_FILE_NAME } from '@/constants';
import { ERROR_MESSAGES } from '@/constants/message';
import FileService from '@/services/file';

const DATA_FILE_FULL_PATH = `${process.cwd()}/src/__test__/developer/node/services/${DATA_FILE_PATH}`;

beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date('2024-5-1'));
});

afterAll(() => {
  fs.rmdirSync(DATA_FILE_FULL_PATH, { recursive: true });
  jest.useRealTimers();
});

describe('file service', () => {
  describe('mkDir function', () => {
    test('[success] ディレクトリを作成できる', () => {
      expect(fs.existsSync(DATA_FILE_FULL_PATH)).toBeFalsy();

      FileService.mkDir(DATA_FILE_FULL_PATH);
      expect(fs.existsSync(DATA_FILE_FULL_PATH)).toBeTruthy();
    });

    test('[failed] 既に存在するディレクトリの作成は失敗する', () => {
      expect(fs.existsSync(DATA_FILE_FULL_PATH)).toBeTruthy();

      try {
        FileService.mkDir(DATA_FILE_FULL_PATH);
      } catch (e: any) {
        expect(e).toBeInstanceOf(Error);
        expect(JSON.parse(e.message)).toEqual({
          status: 500,
          errors: [
            {
              code: 'BC001',
              message: ERROR_MESSAGES.BC001,
              timestamp: '2024-05-01 00:00:00.000',
            },
          ],
          target: {
            dir: DATA_FILE_FULL_PATH,
          },
        });
      }
    });
  });

  describe('readDir function', () => {
    // テスト開始時にディレクトリを削除しておく
    beforeAll(() =>
      fs.rmdirSync(DATA_FILE_FULL_PATH, {
        recursive: true,
      })
    );

    test('[success] ディレクトリの読み込みが成功する', () => {
      const result = FileService.readDir(DATA_FILE_FULL_PATH);
      expect(fs.existsSync(DATA_FILE_FULL_PATH)).toBeTruthy();
      expect(result).toEqual([]);
    });

    test('[failed] 権限のないディレクトリの読み込みは失敗する', async () => {
      await fsPromises.chmod(DATA_FILE_FULL_PATH, '000');

      try {
        FileService.readDir(DATA_FILE_FULL_PATH);
      } catch (e: any) {
        expect(e).toBeInstanceOf(Error);
        expect(JSON.parse(e.message)).toEqual({
          status: 500,
          errors: [
            {
              code: 'BC002',
              message: ERROR_MESSAGES.BC002,
              timestamp: '2024-05-01 00:00:00.000',
            },
          ],
          target: {
            dir: DATA_FILE_FULL_PATH,
          },
        });
      }
    });
  });

  describe('writeFile function', () => {
    // テスト開始時にディレクトリを削除しておく
    beforeAll(() =>
      fs.rmdirSync(DATA_FILE_FULL_PATH, {
        recursive: true,
      })
    );

    test('[success] ファイルへの書き込みが成功する', () => {
      FileService.writeFile(DATA_FILE_FULL_PATH, SEQUENCE_FILE_NAME, '1');
      expect(fs.existsSync(DATA_FILE_FULL_PATH)).toBeTruthy();
      expect(
        fs.existsSync(path.join(DATA_FILE_FULL_PATH, SEQUENCE_FILE_NAME))
      ).toBeTruthy();

      const result = FileService.readDir(DATA_FILE_FULL_PATH);
      expect(result).toEqual(['sequence.txt']);
    });

    test('[failed] 権限のないファイルへの書き込みは失敗する', async () => {
      // 書き込みが失敗するように権限を変更しておく
      await fsPromises.chmod(
        path.join(DATA_FILE_FULL_PATH, SEQUENCE_FILE_NAME),
        '400'
      );

      try {
        FileService.writeFile(DATA_FILE_FULL_PATH, SEQUENCE_FILE_NAME, '1');
      } catch (e: any) {
        expect(e).toBeInstanceOf(Error);
        expect(JSON.parse(e.message)).toEqual({
          status: 500,
          errors: [
            {
              code: 'BC003',
              message: ERROR_MESSAGES.BC003,
              timestamp: '2024-05-01 00:00:00.000',
            },
          ],
          target: {
            dir: DATA_FILE_FULL_PATH,
            file: SEQUENCE_FILE_NAME,
            data: '1',
          },
        });
      }
    });
  });

  describe('readFile function', () => {
    // テスト開始時に権限を変更しておく
    beforeAll(async () =>
      fsPromises.chmod(
        path.join(DATA_FILE_FULL_PATH, SEQUENCE_FILE_NAME),
        '400'
      )
    );

    test('[success] ファイルの読み込みが成功する', () => {
      const result = FileService.readFile(
        DATA_FILE_FULL_PATH,
        SEQUENCE_FILE_NAME
      );
      expect(result).toBe('1');
    });

    test('[failed] 権限のないファイルの読み込みは失敗する', async () => {
      // 読み込みが失敗するように権限を変更しておく
      await fsPromises.chmod(
        path.join(DATA_FILE_FULL_PATH, SEQUENCE_FILE_NAME),
        '100'
      );

      try {
        FileService.readFile(DATA_FILE_FULL_PATH, SEQUENCE_FILE_NAME);
      } catch (e: any) {
        expect(e).toBeInstanceOf(Error);
        expect(JSON.parse(e.message)).toEqual({
          status: 500,
          errors: [
            {
              code: 'BC004',
              message: ERROR_MESSAGES.BC004,
              timestamp: '2024-05-01 00:00:00.000',
            },
          ],
          target: {
            dir: DATA_FILE_FULL_PATH,
            file: SEQUENCE_FILE_NAME,
          },
        });
      }
    });
  });
});
