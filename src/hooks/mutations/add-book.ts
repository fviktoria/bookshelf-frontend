import { API_BOOKSHELF, API_WP } from '../../util/constants';
import { fetcher } from '../../util/fetcher';

export const addBook = (user: number, book: number): Promise<any> => {
  return fetcher('POST', API_BOOKSHELF + '/addBook', { user: 'user_' + user, book });
};
