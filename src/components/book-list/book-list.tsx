import { FC } from 'react';
import { BookQueryRes, useBookQuery } from '../../hooks/queries/use-books-query';
import { Book } from '../../util/types/book';
import { Post } from '../../util/types/post';
import { useUserContext } from '../../util/user-context';
import { Container } from '../layout/container';
import { BookListItem } from './book-list-item';

type BookListProps = {
  data: BookQueryRes;
};

export const BookList: FC<BookListProps> = ({ data }) => {
  //const user = useUserContext();
  const { books, isLoading } = data;

  return <Container wide>{!isLoading && books.map((book) => <BookListItem book={book} />)}</Container>;
};
