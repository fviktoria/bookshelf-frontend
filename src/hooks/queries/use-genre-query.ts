import useSWR from 'swr';
import { API_BOOKSHELF, API_WP } from '../../util/constants';
import { fetcher } from '../../util/fetcher';
import { Book } from '../../util/types/book';
import { BookGenre } from '../../util/types/book-genre';
import { Post } from '../../util/types/post';
import { WPQueryPost } from '../../util/types/wp-query-post';

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
