/* eslint-disable no-underscore-dangle */
import type { NextApiRequest, NextApiResponse } from 'next';
import httpMocks from 'node-mocks-http';

import { testLogList } from '@/__test__/developer/jsdom/data/log-list';
import handler from '@/pages/api/games/[id]/[round]';

jest.mock('@/services/admin', () => {
  const originalModule = jest.requireActual('@/services/admin');

  const findRound = jest.fn();
  findRound
    .mockImplementationOnce(() => ({
      round: 1,
      logs: testLogList,
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
      findRound,
    },
  };
});

describe('/games/[id]/[round] handler', () => {
  test('responds 200 to GET', async () => {
    const req = httpMocks.createRequest<NextApiRequest>({
      query: {
        id: '1',
        round: '1',
      },
    });
    const res = httpMocks.createResponse<NextApiResponse>();

    await handler(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({ round: 1, logs: testLogList });
  });

  test('responds 500 to GET', async () => {
    const req = httpMocks.createRequest<NextApiRequest>({
      query: {
        id: '1',
        round: '1',
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
        round: '1',
      },
    });
    const res = httpMocks.createResponse<NextApiResponse>();

    await handler(req, res);
    expect(res.statusCode).toBe(404);
  });
});
