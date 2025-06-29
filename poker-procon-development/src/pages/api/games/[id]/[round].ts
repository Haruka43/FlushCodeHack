import type { NextApiRequest, NextApiResponse } from 'next';

import { getLogger } from '@/libs/logger';
import type {
  CustomeErrorResponse,
  FindRoundResponse,
} from '@/schema/response';
import AdminService from '@/services/admin';
import { generateErrorObject } from '@/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FindRoundResponse | CustomeErrorResponse>
) {
  const id = `${req.query.id}`;
  const round = Number(req.query.round);
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
    // A-005
    case 'GET': {
      try {
        const data = AdminService.findRound(id, round);
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
