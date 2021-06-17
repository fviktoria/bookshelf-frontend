import useSWR from 'swr';
import { MutatorCallback } from 'swr/dist/types';
import { API_BOOKSHELF } from '../../util/constants';
import { fetcher } from '../../util/fetcher';
import { Book } from '../../util/types/book';
import { WPQueryPost } from '../../util/types/wp-query-post';

export const fetchBooks = (ids?: string[], page?: number, genres?: number[]): Promise<any> => {
  const args = {
    ...(ids && { include: ids.join(',') }),
    per_page: 5,
    page: page || 1,
    ...(genres && { genres: genres.join(',') }),
  };
  return fetcher('GET', API_BOOKSHELF + '/books', args);
};

export const useBookQuery = (ids?: string[], page?: number, genres?: number[]): BookQueryRes => {
  const { data, error, mutate } = useSWR(
    `/books?page=${page}&include=${ids?.join(',')}&genres=${genres?.join(',')}`,
    () => fetchBooks(ids, page, genres),
  );
  return {
    books: data && data.data,
    headers: data && data.headers,
    error,
    isLoading: !data && !error,
    mutate,
  };
};

export type BookQueryRes = {
  books: WPQueryPost<Book>[];
  headers: any;
  error: boolean;
  isLoading: boolean;
  mutate: MutatorCallback;
};
