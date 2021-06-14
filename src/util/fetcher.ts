import axios, { Method } from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'https://api.s1810456009.student.kwmhgb.at/wp-json/wp/v2';
const TOKEN = Cookies.get('token') || undefined;

export const fetcher = async <Req>(method: Method, endpoint: string, data?: Req) => {
  return (
    await axios({
      method,
      url: `${API_URL}${endpoint}`,
      data,
      params: method === 'get' ? data : undefined,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
  ).data;
};
