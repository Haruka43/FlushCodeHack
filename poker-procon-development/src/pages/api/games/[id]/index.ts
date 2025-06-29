import type { NextApiRequest, NextApiResponse } from 'next';

import { SUCCESS_MESSAGES } from '@/constants/message';
import { getLogger } from '@/libs/logger';
import type {
  CustomeErrorResponse,
  FindGameByIdResponse,
  StartGameResponse,
} from '@/schema/response';
import AdminService from '@/services/admin';
import GameService from '@/services/game';
import { generateErrorObject, parsePageInfo } from '@/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    FindGameByIdResponse | StartGameResponse | CustomeErrorResponse
  >
) {
  const id = `${req.query.id}`;
  const logger = getLogger({ group: 'application', gameId: id });
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
    // A-003
    case 'GET': {
      try {
        const data = AdminService.findLogById(id, parsePageInfo(req));
        res.status(200).json(data);
      } catch (e: any) {
        const err = JSON.parse(e.message);
        logger?.error(e.message);
        res.status(err.status).json(err);
      }
      break;
    }
    // A-004
    case 'POST':
      try {
        const gameService = new GameService(id);
        gameService.start();
        res.status(200).json({
          id,
          message: SUCCESS_MESSAGES.createGame,
        });
      } catch (e: any) {
        const err = JSON.parse(e.message);
        logger?.error(e.message);
        res.status(err.status).json(err);
      }
      break;
    default: {
      const status = 404;
      res.status(status).json({
        status,
        errors: [generateErrorObject('BA001')],
      });
    }
  }
}
