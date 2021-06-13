import axios, { Method } from 'axios';

const API_URL = 'https://api.s1810456009.student.kwmhgb.at/wp-json/jwt-auth/v1/token/validate';

export const validate = async <Req, Res>(token: string) => {
  return (
    await axios({
      method: 'POST',
      url: `${API_URL}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};
