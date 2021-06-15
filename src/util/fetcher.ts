import axios, { Method } from 'axios';
import Cookies from 'js-cookie';
import { API_URL } from './constants';

const TOKEN = Cookies.get('token') || undefined;

export const fetcher = async <Req>(method: Method, endpoint: string, data?: Req) => {
  const headers = {};
  const res = await axios({
    method,
    url: `${API_URL}${endpoint}`,
    data,
    params: method === 'get' ? data : undefined,
    headers: {
      ...(TOKEN && { Authorization: `Bearer ${TOKEN}` }),
    },
  });

  return res;
};
