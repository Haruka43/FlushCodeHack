/* eslint-disable no-underscore-dangle */
import type { NextApiRequest, NextApiResponse } from 'next';
import httpMocks from 'node-mocks-http';

import handler from '@/pages/api/players';

jest.mock('@/services/admin', () => {
  const originalModule = jest.requireActual('@/services/admin');

  const findPlayers = jest.fn();
  findPlayers
    .mockImplementationOnce(() => ['Player1', 'Player2', 'Player3', 'Player4'])
    .mockImplementationOnce(() => {
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
      findPlayers,
    },
  };
});

describe('/games handler', () => {
  test('responds 200 to GET', async () => {
    const req = httpMocks.createRequest<NextApiRequest>();
    const res = httpMocks.createResponse<NextApiResponse>();

    await handler(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({
      list: ['Player1', 'Player2', 'Player3', 'Player4'],
    });
  });

  test('responds 500 to GET', async () => {
    const req = httpMocks.createRequest<NextApiRequest>();
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
    });
    const res = httpMocks.createResponse<NextApiResponse>();

    await handler(req, res);
    expect(res.statusCode).toBe(404);
  });
});
