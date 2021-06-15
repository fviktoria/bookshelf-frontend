import useSWR from 'swr';
import { API_BOOKSHELF, API_WP } from '../../util/constants';
import { fetcher } from '../../util/fetcher';
import { Book } from '../../util/types/book';
import { Post } from '../../util/types/post';
import { WPQueryPost } from '../../util/types/wp-query-post';

export const fetchBooks = (ids?: string[], page?: number): Promise<any> => {
  const args = {
    ...(ids && { include: ids.join(',') }),
    per_page: 5,
    page: page || 1,
  };
  return fetcher('GET', API_BOOKSHELF + '/books', args);
};

export const useBookQuery = (ids?: string[], page?: number): BookQueryRes => {
  const { data, error } = useSWR(`/books?page=${page}&include=${ids?.join(',')}`, () => fetchBooks(ids, page));
  return {
    books: data && data.data,
    headers: data && data.headers,
    error,
    isLoading: !data && !error,
  };
};

export type BookQueryRes = {
  books: WPQueryPost<Book>[];
  headers: any;
  error: boolean;
  isLoading: boolean;
};
