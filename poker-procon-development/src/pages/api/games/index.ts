import type { NextApiRequest, NextApiResponse } from 'next';

import { getLogger } from '@/libs/logger';
import type {
  CreateGameResponse,
  CustomeErrorResponse,
  FindGamesResponse,
} from '@/schema/response';
import AdminService from '@/services/admin';
import { generateErrorObject, parsePageInfo } from '@/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    FindGamesResponse | CreateGameResponse | CustomeErrorResponse
  >
) {
  const logger = getLogger({ group: 'application' });
  logger?.debug(
    JSON.stringify({
      url: req.url,
      method: req.method,
      query: req.query,
      body: req.body,
    })
  );

  const { method } = req;
  switch (method) {
    // A-001
    case 'GET': {
      try {
        const data = AdminService.findGames(parsePageInfo(req));
        res.status(200).json(data);
      } catch (e: any) {
        const err = JSON.parse(e.message);
        logger?.error(e.message);
        res.status(err.status).json(err);
      }
      break;
    }
    // A-002
    case 'POST': {
      try {
        const data = AdminService.createGame(req.body);
        res.status(200).json(data);
      } catch (e: any) {
        const err = JSON.parse(e.message);
        logger?.error(e.message);
        res.status(err.status).json(err);
      }
      break;
    }
    default: {
      const status = 404;
      res.status(status).json({
        status,
        errors: [generateErrorObject('BA001')],
      });
    }
  }
}
