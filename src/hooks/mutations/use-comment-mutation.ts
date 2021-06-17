import { mutate } from 'swr';
import { API_WP } from '../../util/constants';
import { fetcher } from '../../util/fetcher';

export const postComment = (author: number, content: string, post: number): Promise<any> => {
  return fetcher('POST', API_WP + '/comments', { author, content, post });
};

export const deleteComment = (id: number): Promise<any> => {
  return fetcher('DELETE', API_WP + '/comments/' + id);
};
