import axios from 'axios';

import { API_HOST } from '@/constants';

const customAxios = axios.create({
  baseURL: `${API_HOST}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

customAxios.interceptors.response.use(
  (response) => response,
  (e: any) => {
    switch (e.response.status) {
      case 404: // Not Found
        window.location.href = '/404';
        break;
      default:
        throw e.response.data;
    }
  }
);

export default customAxios;
