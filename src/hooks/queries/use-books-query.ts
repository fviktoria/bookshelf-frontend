import useSWR from 'swr';
import { fetcher } from '../../util/fetcher';
import { Book } from '../../util/types/book';
import { Post } from '../../util/types/post';

export const fetchBooks = (ids?: string[], page?: number): Promise<any> => {
  const endpoint = ids
    ? '/book/?include=' + ids.join(',') + '&per_page=5&page=' + page
    : '/book?per_page=5&page=' + page;
  return fetcher('GET', endpoint);
};

export const useBookQuery = (ids?: string[], page?: number): BookQueryRes => {
  const key = ids ? '/book/?include=' + ids.join(',') : '/book';
  const { data, error } = useSWR(key + '?page=' + page, () => fetchBooks(ids, page));
  return {
    books: data && data.data,
    headers: data && data.headers,
    error,
    isLoading: !data && !error,
  };
};

export type BookQueryRes = {
  books: Post<Book>[];
  headers: any;
  error: boolean;
  isLoading: boolean;
};
