import useSWR from 'swr';
import { fetcher } from '../../util/fetcher';
import { Book } from '../../util/types/book';
import { Post } from '../../util/types/post';

export const fetchBooks = (ids?: string[]): Promise<any> => {
  const endpoint = ids ? '/book/?include=' + ids.join(',') : '/book';
  return fetcher('GET', endpoint);
};

export const useBookQuery = (ids?: string[]): BookQueryRes => {
  const key = ids ? '/book/?include=' + ids.join(',') : '/book';
  const { data, error } = useSWR(key, () => fetchBooks(ids));
  return {
    books: data,
    error,
    isLoading: !data && !error,
  };
};

export type BookQueryRes = {
  books: Post<Book>[];
  error: boolean;
  isLoading: boolean;
};
