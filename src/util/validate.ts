import axios, { Method } from 'axios';
import Cookies from 'js-cookie';
import useSWR from 'swr';

const API_URL = 'https://api.s1810456009.student.kwmhgb.at/wp-json/jwt-auth/v1/token/validate';
const token = Cookies.get('token') || undefined;

export const validate = async <Req, Res>() => {
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

export const useValidateToken = () => {
  const { data, error } = useSWR('/token/validate', validate);

  return { data, error, isLoading: !data && !error };
};
