/* eslint-disable no-underscore-dangle */
import type { NextApiRequest, NextApiResponse } from 'next';
import httpMocks from 'node-mocks-http';

import { testGameInfoData } from '@/__test__/developer/node/data/game-info';
import { testLogList } from '@/__test__/developer/node/data/log-list';
import { SUCCESS_MESSAGES } from '@/constants/message';
import handler from '@/pages/api/games/[id]';

jest.mock('@/services/admin', () => {
  const originalModule = jest.requireActual('@/services/admin');

  const findLogById = jest.fn();
  findLogById
    .mockImplementationOnce(() => ({
      game: testGameInfoData,
      list: {
        rounde: 1,
        logs: testLogList,
      },
      total: 1,
    }))
    .mockImplementation(() => {
      throw new Error(
        JSON.stringify({
          status: 500,
          errors: [{ code: 'BA001' }],
        })
      );
    });

  return {
    __esModule: true,
    ...originalModule,
    default: {
      ...originalModule.default,
      findLogById,
    },
  };
});

jest.mock('@/services/game', () => {
  return jest
    .fn()
    .mockImplementationOnce(() => {
      const start = jest.fn();
      start.mockImplementationOnce(() => {
        return null;
      });

      return { start };
    })
    .mockImplementationOnce(() => {
      const start = jest.fn();
      start.mockImplementation(() => {
        throw new Error(
          JSON.stringify({
            status: 500,
            errors: [{ code: 'BA001' }],
          })
        );
      });

      return { start };
    });
});

describe('/games/[id] handler', () => {
  test('responds 200 to GET', async () => {
    const req = httpMocks.createRequest<NextApiRequest>({
      query: {
        id: '1',
        page: 1,
        per_page: 20,
      },
    });
    const res = httpMocks.createResponse<NextApiResponse>();

    await handler(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData().game).toEqual(testGameInfoData);
  });

  test('responds 500 to GET', async () => {
    const req = httpMocks.createRequest<NextApiRequest>({
      query: {
        id: '1',
        page: 1,
        per_page: 20,
      },
    });
    const res = httpMocks.createResponse<NextApiResponse>();

    await handler(req, res);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toEqual({
      status: 500,
      errors: [{ code: 'BA001' }],
    });
  });

  test('responds 200 to POST', async () => {
    const req = httpMocks.createRequest<NextApiRequest>({
      method: 'POST',
      query: {
        id: '1',
      },
      body: {
        player: ['Player1', 'Player2', 'Player3', 'Player4'],
      },
    });
    const res = httpMocks.createResponse<NextApiResponse>();

    await handler(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({
      id: '1',
      message: SUCCESS_MESSAGES.createGame,
    });
  });

  test('responds 500 to GET', async () => {
    const req = httpMocks.createRequest<NextApiRequest>({
      method: 'POST',
      query: {
        id: '1',
      },
      body: {
        player: ['Player1', 'Player2', 'Player3', 'Player4'],
      },
    });
    const res = httpMocks.createResponse<NextApiResponse>();

    await handler(req, res);
    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toEqual({
      status: 500,
      errors: [{ code: 'BA001' }],
    });
  });

  test('responds 404 to PUT', async () => {
    const req = httpMocks.createRequest<NextApiRequest>({
      method: 'PUT',
      query: {
        id: '1',
      },
    });
    const res = httpMocks.createResponse<NextApiResponse>();

    await handler(req, res);
    expect(res.statusCode).toBe(404);
  });
});
