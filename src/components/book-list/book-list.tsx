import { FC } from 'react';
import { useBookQuery } from '../../hooks/queries/use-books-query';
import { useUserContext } from '../../util/user-context';
import { Container } from '../layout/container';
import { BookListItem } from './book-list-item';

export const BookList: FC = () => {
  const { books, error, isLoading } = useBookQuery();
  const user = useUserContext();

  return <Container wide>{!isLoading && books.map((book) => <BookListItem book={book} />)}</Container>;
};
