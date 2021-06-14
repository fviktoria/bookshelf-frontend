import { FC } from 'react';
import { useBookQuery } from '../../hooks/queries/use-books-query';
import { Bookshelf } from '../../pages/bookshelf';
import { BookListItem } from './book-list-item';

export const BookList: FC = () => {
  const { books, error, isLoading } = useBookQuery();
  return <div>{!isLoading && books.map((book) => <BookListItem book={book} />)}</div>;
};
