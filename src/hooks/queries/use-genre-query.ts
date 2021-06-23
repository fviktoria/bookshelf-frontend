import useSWR from 'swr';
import { API_BOOKSHELF } from '../../util/constants';
import { fetcher } from '../../util/fetcher';
import { BookGenre } from '../../util/types/book-genre';

export const fetchGenres = (): Promise<any> => {
  return fetcher('GET', API_BOOKSHELF + '/books/genres');
};

export const useGenreQuery = (ids?: string[], page?: number): BookQueryRes => {
  const { data, error } = useSWR(`/books/genres`, fetchGenres);
  return {
    genres: data && data.data,
    headers: data && data.headers,
    error,
    isLoading: !data && !error,
  };
};

export type BookQueryRes = {
  genres: BookGenre[];
  headers: any;
  error: boolean;
  isLoading: boolean;
};
