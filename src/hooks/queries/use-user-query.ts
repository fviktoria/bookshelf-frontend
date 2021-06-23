import useSWR from 'swr';
import { MutatorCallback } from 'swr/dist/types';
import { API_WP } from '../../util/constants';
import { fetcher } from '../../util/fetcher';

export const fetchUser = (id?: string): Promise<any> => {
  return fetcher('GET', API_WP + '/users/' + id);
};

export const useUserQuery = (id?: string): UserQueryRes => {
  const { data, error, mutate } = useSWR(
    () => (id ? '/users/' + id : null),
    () => fetchUser(id),
  );
  return {
    user: data && data.data,
    error,
    isLoading: !data && !error,
    mutate,
  };
};

type UserQueryRes = {
  user: any;
  error: boolean;
  isLoading: boolean;
  mutate: MutatorCallback;
};
