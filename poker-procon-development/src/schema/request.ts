import * as yup from 'yup';

import { MIN_PLAYER } from '@/constants/game';
import { ERROR_MESSAGES } from '@/constants/message';

export type PageInfo = {
  page: number;
  per_page: number;
};

export type ListCuttingRange = {
  start: number;
  end: number;
};

// A-002
export const CreateGameSchema = yup
  .object()
  .shape({
    players: yup
      .array(yup.string().required(ERROR_MESSAGES.BB001))
      .min(MIN_PLAYER, ERROR_MESSAGES.BB004)
      .max(MIN_PLAYER, ERROR_MESSAGES.BB004)
      .required(),
    totalRound: yup
      .number()
      .typeError(ERROR_MESSAGES.BB002)
      .integer(ERROR_MESSAGES.BB003)
      .min(1, ERROR_MESSAGES.BB005)
      .max(10000, ERROR_MESSAGES.BB008)
      .required(),
    initialPoint: yup
      .number()
      .typeError(ERROR_MESSAGES.BB002)
      .integer(ERROR_MESSAGES.BB003)
      .min(1000, ERROR_MESSAGES.BB006)
      .max(1000000, ERROR_MESSAGES.BB009)
      .required(),
    fee: yup
      .number()
      .typeError(ERROR_MESSAGES.BB002)
      .integer(ERROR_MESSAGES.BB003)
      .min(1, ERROR_MESSAGES.BB005)
      .max(1000, ERROR_MESSAGES.BB007)
      .required(),
  })
  .required();

export type CreateGameRequestType = yup.InferType<typeof CreateGameSchema>;
