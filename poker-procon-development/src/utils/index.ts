import { format } from 'date-fns';
import type { NextApiRequest } from 'next';
import { generatePath } from 'react-router-dom';

import { ERROR_MESSAGES } from '@/constants/message';
import type { ErrorCode } from '@/schema/common';

export const generateScreenURL = (path: string, params?: any, search?: any) => {
  const url = generatePath(path, params);
  // const query = queryString.stringify(search);
  const query = new URLSearchParams(search).toString();
  return query ? `${url}?${query}` : url;
};

export const generateApiURL = (path: string, search?: any) => {
  // const query = queryString.stringify(search);
  const query = new URLSearchParams(search).toString();
  return query ? `${path}?${query}` : path;
};

export const parsePageInfo = (req: NextApiRequest) => {
  const page = Number(req.query.page ?? 1);
  const perPage = Number(req.query.per_page ?? 100);
  return {
    start: (page - 1) * perPage,
    end: (page - 1) * perPage + perPage,
  };
};

export const generateErrorObject = (code: ErrorCode) => {
  return {
    code,
    message: ERROR_MESSAGES[code],
    timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS'),
  };
};
