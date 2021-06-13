import useSWR from 'swr';
import { fetcher } from '../../util/fetcher';

export const fetchBooks = (): Promise<any> => {
  return fetcher('GET', '/book');
};

export const useBookQuery = () => {
  const { data, error } = useSWR('/book', fetchBooks);
  return {
    books: data,
    error,
  };
};
