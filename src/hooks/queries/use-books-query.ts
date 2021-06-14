import useSWR from 'swr';
import { fetcher } from '../../util/fetcher';
import { Book } from '../../util/types/book';
import { Post } from '../../util/types/post';

export const fetchBooks = (): Promise<any> => {
  return fetcher('GET', '/book');
};

export const useBookQuery = (): BookQueryRes => {
  const { data, error } = useSWR('/book', fetchBooks);
  return {
    books: data,
    error,
    isLoading: !data && !error,
  };
};

type BookQueryRes = {
  books: Post<Book>[];
  error: boolean;
  isLoading: boolean;
};
