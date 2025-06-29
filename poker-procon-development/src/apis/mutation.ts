import { useMutation } from 'react-query';

import { createGame, startGame } from '@/clients/game';

// A-002
export const useCreateGameMutation = () => {
  return useMutation(createGame);
};

// A-004
export const useStartGameMutation = () => {
  return useMutation(startGame);
};
