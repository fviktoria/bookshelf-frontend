import axios, { Method } from 'axios';

const API_URL = 'https://api.s1810456009.student.kwmhgb.at/wp-json/wp/v2';

export const fetcher = async <Req, Res>(method: Method, endpoint: string, data?: Req) => {
  return (
    await axios({
      method,
      url: `${API_URL}${endpoint}`,
      data,
      params: method === 'get' ? data : undefined,
    })
  ).data;
};
