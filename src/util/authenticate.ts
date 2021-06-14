import axios from 'axios';

const API_URL = 'https://api.s1810456009.student.kwmhgb.at/wp-json/jwt-auth/v1/token';

type AuthenticationData = {
  token: string;
  user_display_name: string;
  user_email: string;
  user_nicename: string;
};

export const authenticate = async <Req>(data?: Req) => {
  return (
    await axios({
      method: 'POST',
      url: `${API_URL}`,
      data,
    })
  ).data as AuthenticationData;
};
