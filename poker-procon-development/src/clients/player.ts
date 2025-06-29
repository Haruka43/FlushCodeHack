import axios from 'axios';

import { API_HOST } from '@/constants';

// プレイヤー取得
export const findPlayers = async () => {
  const response = await axios.get(`${API_HOST}/api/players`);
  return response.data;
};
