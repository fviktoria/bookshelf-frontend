import { FC, useState } from 'react';
import { BookList } from '../components/book-list/book-list';
import { useBookQuery } from '../hooks/queries/use-books-query';
import { useUserContext } from '../util/user-context';

export const Bookshelf: FC = () => {
  const user = useUserContext();
  console.log('bookshelf user', user);
  const [currentPage, setCurrentPage] = useState(1);

  return <BookList />;
};
