import useSWR from 'swr';
import { MutatorCallback } from 'swr/dist/types';
import { API_BOOKSHELF } from '../../util/constants';
import { fetcher } from '../../util/fetcher';
import { Book } from '../../util/types/book';
import { WPQueryPost } from '../../util/types/wp-query-post';

export const fetchBooks = (
  ids?: string[],
  page?: number,
  genres?: number[],
  orderby?: string,
  order?: string,
): Promise<any> => {
  const args = {
    ...(ids && { include: ids.join(',') }),
    per_page: 5,
    page: page || 1,
    ...(genres && { genres: genres.join(',') }),
    orderby,
    order,
  };
  return fetcher('GET', API_BOOKSHELF + '/books', args);
};

export const useBookQuery = (
  ids?: string[],
  page?: number,
  genres?: number[],
  orderBy?: string,
  order?: string,
): BookQueryRes => {
  const { data, error, mutate } = useSWR(
    `/books?page=${page}&include=${ids?.join(',')}&genres=${genres?.join(',')}&orderby=${orderBy}&order=${order}`,
    () => fetchBooks(ids, page, genres, orderBy, order),
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
