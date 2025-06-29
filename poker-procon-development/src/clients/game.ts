import customAxios from '@/libs/axios';
import type { CreateGameRequestType, PageInfo } from '@/schema/request';
import type {
  CreateGameResponse,
  FindGameByIdResponse,
  FindGamesResponse,
  FindRoundResponse,
  StartGameResponse,
} from '@/schema/response';
import { generateApiURL } from '@/utils';

// A-001
export const findGames = async (
  query: PageInfo
): Promise<FindGamesResponse> => {
  const response = await customAxios.get(generateApiURL('/games', query));
  return response.data;
};

// A-002
export const createGame = async (
  data: CreateGameRequestType
): Promise<CreateGameResponse> => {
  const response = await customAxios.post('/games', data);
  return response.data;
};

// A-003
export const findGameById = async (
  id: string,
  query: PageInfo
): Promise<FindGameByIdResponse> => {
  const response = await customAxios.get(generateApiURL(`/games/${id}`, query));
  return response.data;
};

// A-004
export const startGame = async (id: string): Promise<StartGameResponse> => {
  const response = await customAxios.post(`/games/${id}`, {});
  return response.data;
};

// A-005
export const findRound = async (
  id: string,
  round: number
): Promise<FindRoundResponse> => {
  const response = await customAxios.get(
    generateApiURL(`/games/${id}/${round}`)
  );
  return response.data;
};
