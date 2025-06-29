import type { NextApiRequest, NextApiResponse } from 'next';

import { getLogger } from '@/libs/logger';
import type {
  CustomeErrorResponse,
  FindPlayersResponse,
} from '@/schema/response';
import AdminService from '@/services/admin';
import { generateErrorObject } from '@/utils';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<FindPlayersResponse | CustomeErrorResponse>
) {
  const { method } = req;
  switch (method) {
    case 'GET': {
      try {
        const list = AdminService.findPlayers();
        res.status(200).json({ list });
      } catch (e: any) {
        const err = JSON.parse(e.message);
        getLogger({ group: 'application' })?.error(e.message);
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
