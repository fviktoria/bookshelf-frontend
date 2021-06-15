import useSWR from 'swr';
import { API_WP } from '../../util/constants';
import { fetcher } from '../../util/fetcher';

export const fetchUser = (id?: string): Promise<any> => {
  return fetcher('GET', API_WP + '/users/' + id);
};

export const useUserQuery = (id: string = '0'): UserQueryRes => {
  const { data, error } = useSWR('/users/' + id, () => fetchUser(id));
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
