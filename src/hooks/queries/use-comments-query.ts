import useSWR from 'swr';
import { MutatorCallback } from 'swr/dist/types';
import { API_WP } from '../../util/constants';
import { fetcher } from '../../util/fetcher';
import { Comment } from '../../util/types/comment';

export const fetchComments = (id?: number): Promise<any> => {
  return fetcher('GET', API_WP + '/comments/?post=' + id);
};

export const useCommentsQuery = (id?: number): CommentsQueryRes => {
  const { data, error, mutate } = useSWR(id ? '/comments/?post=' + id : null, () => fetchComments(id));
  return {
    comments: data && data.data,
    headers: data && data.headers,
    error,
    isLoading: !data && !error,
    mutate,
  };
};

export type CommentsQueryRes = {
  comments: Comment[];
  headers: any;
  error: boolean;
  isLoading: boolean;
  mutate: MutatorCallback;
};
