import { API_WP } from '../../util/constants';
import { fetcher } from '../../util/fetcher';

export const registerUser = (username: string, email: string, password: string): Promise<any> => {
  return fetcher('POST', API_WP + '/users/register', { username, email, password });
};
