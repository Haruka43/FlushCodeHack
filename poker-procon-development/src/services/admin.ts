import fs from 'fs';
import matter from 'gray-matter';

import { DATA_FILE_PATH, LOG_FILE_PATH, SEQUENCE_FILE_NAME } from '@/constants';
import { getLogger } from '@/libs/logger';
import type { Game, GameStatus } from '@/schema/game';
import type { Log } from '@/schema/log';
import type { Player } from '@/schema/player';
import type { CreateGameRequestType, ListCuttingRange } from '@/schema/request';
import type {
  CreateGameResponse,
  FindGameByIdResponse,
  FindGamesResponse,
  FindRoundResponse,
} from '@/schema/response';
import Players from '@/services/players';
import { shuffleArray } from '@/utils/game';

import FileService from './file';

const DATA_FILE_FULL_PATH = `${process.cwd()}/${DATA_FILE_PATH}`;
const LOG_FILE_FULL_PATH = `${process.cwd()}/${LOG_FILE_PATH}`;

class AdminService {
  public static findGames(
    listCuttingRange: ListCuttingRange
  ): FindGamesResponse {
    try {
      // 全データを取得
      const files = FileService.readDir(DATA_FILE_FULL_PATH);
      const list = files
        ?.filter((file) => file.match(/.json/))
        .sort((a, b) => Number(b.split('.')[0]) - Number(a.split('.')[0]))
        .map((file) => {
          const data = FileService.readFile(DATA_FILE_FULL_PATH, file);
          return JSON.parse(data ?? '') as Game;
        });

      return {
        list: list?.slice(listCuttingRange.start, listCuttingRange.end) ?? [],
        total: list?.length ?? 0,
      };
    } catch (e: any) {
      if (e instanceof Error) {
        throw e;
      } else {
        getLogger({ group: 'application' })?.error(e.message);
        throw new Error(e);
      }
    }
  }

  public static createGame(data: CreateGameRequestType): CreateGameResponse {
    try {
      // 最終ゲームIDのファイルを読み込み、存在しなければ作成する
      if (!fs.existsSync(`${DATA_FILE_FULL_PATH}/${SEQUENCE_FILE_NAME}`))
        FileService.writeFile(DATA_FILE_FULL_PATH, SEQUENCE_FILE_NAME, '');

      // 最終ゲームIDを取得
      const sequence = FileService.readFile(
        DATA_FILE_FULL_PATH,
        SEQUENCE_FILE_NAME
      );
      if (!sequence) {
        FileService.writeFile(DATA_FILE_FULL_PATH, SEQUENCE_FILE_NAME, '');
      }

      // ゲームIDを発行
      const id = sequence ? Number(sequence) + 1 : 1;

      // 最終ゲームIDを更新
      FileService.writeFile(DATA_FILE_FULL_PATH, SEQUENCE_FILE_NAME, `${id}`);

      // プレイヤー情報を初期化
      const players: { [key: string]: Player } = {};
      data.players.forEach((name: string) => {
        players[name] = {
          name,
          status: 'active',
          point: data.initialPoint,
          round: {
            betPoint: 0,
            first: 0,
            second: 0,
            cards: [],
            action: null,
          },
        };
      });

      // 新規ゲーム情報を保存
      const save: Game = {
        id: `${id}`,
        status: 'new' as GameStatus,
        createdAt: new Date().toJSON(),
        ...data,
        players,
        seatingOrder: shuffleArray(data.players),
      };

      FileService.writeFile(
        DATA_FILE_FULL_PATH,
        `${id}.json`,
        JSON.stringify(save, null, 2)
      );

      return save;
    } catch (e: any) {
      if (e instanceof Error) {
        throw e;
      } else {
        getLogger({ group: 'application' })?.error(e.message);
        throw new Error(e);
      }
    }
  }

  public static findLogById(
    id: string,
    listCuttingRange: ListCuttingRange
  ): FindGameByIdResponse {
    try {
      // ゲームデータを取得
      const data = FileService.readFile(DATA_FILE_FULL_PATH, `${id}.json`);
      const game = JSON.parse(data ?? '') as Game;

      // ゲームログ読み込み
      const fileNames = FileService.readDir(`${LOG_FILE_FULL_PATH}/${id}/game`);
      const list = fileNames
        ?.map((fileName: string) => fileName)
        .sort(
          (a: string, b: string) =>
            Number(a.split('.')[0]) - Number(b.split('.')[0])
        )
        .map((fileName: string) => {
          const fileContents = FileService.readFile(
            `${LOG_FILE_FULL_PATH}/${id}/game`,
            `${fileName}`
          );
          if (!fileContents) throw new Error('Not found');
          const matterResult = matter(fileContents);
          return {
            round: Number(fileName.split('.')[0]),
            logs: matterResult.content
              .split('\n')
              .filter((item) => item)
              .map((item) => JSON.parse(item)) as unknown as Log[],
          };
        });

      const winRound: { [key: string]: number } = {};
      Object.keys(game.players).forEach((name) => {
        winRound[name] = 0;
      });
      list?.reduce((acc, cur) => {
        const finishLog = cur.logs.find((item) => item.phase === 'finished');
        const winner =
          finishLog?.content.type === 'finished' && finishLog.content.winner;
        if (winner && acc[winner] !== undefined) {
          acc[winner] += 1;
        }
        return acc;
      }, winRound);

      return {
        game,
        list: list?.slice(listCuttingRange.start, listCuttingRange.end) ?? [],
        total: list?.length ?? 0,
        winRound,
      };
    } catch (e: any) {
      if (e instanceof Error) {
        throw e;
      } else {
        getLogger({ group: 'application', gameId: id })?.error(e.message);
        throw new Error(e);
      }
    }
  }

  public static findRound(id: string, round: number): FindRoundResponse {
    try {
      // ゲームログ読み込み
      const fileContents = FileService.readFile(
        `${LOG_FILE_FULL_PATH}/${id}/game`,
        `${round}.log`
      );
      if (!fileContents) throw new Error('Not found');
      const matterResult = matter(fileContents);
      const logs = matterResult.content
        .split('\n')
        .filter((item) => item)
        .map((item) => JSON.parse(item)) as unknown as Log[];

      return { round, logs };
    } catch (e: any) {
      if (e instanceof Error) {
        throw e;
      } else {
        getLogger({ group: 'application', gameId: id })?.error(e.message);
        throw new Error(e);
      }
    }
  }

  public static findPlayers() {
    return Object.keys(Players);
  }
}

export default AdminService;
