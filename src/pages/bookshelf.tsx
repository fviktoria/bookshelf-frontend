import { FC } from 'react';
import { BookList } from '../components/book-list/book-list';
import { useBookQuery } from '../hooks/queries/use-books-query';
import { useUserContext } from '../util/user-context';

export const Bookshelf: FC = () => {
  const user = useUserContext();
  console.log(user);
  const data = useBookQuery(user && user.acf?.books);

  return <BookList data={data} />;
};
