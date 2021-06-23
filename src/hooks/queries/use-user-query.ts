import useSWR from 'swr';
import { API_WP } from '../../util/constants';
import { fetcher } from '../../util/fetcher';

export const fetchUser = (id?: string): Promise<any> => {
  return fetcher('GET', API_WP + '/users/' + id);
};

export const useUserQuery = (id?: string): UserQueryRes => {
  const { data, error } = useSWR(() => id ? '/users/' + id : null, () => fetchUser(id));
  return {
    user: data && data.data,
    error,
    isLoading: !data && !error,
  };
};

type UserQueryRes = {
  user: any;
  error: boolean;
  isLoading: boolean;
};
