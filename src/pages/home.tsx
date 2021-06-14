import { FC, Fragment } from 'react';
import { BookList } from '../components/book-list/book-list';
import { useBookQuery } from '../hooks/queries/use-books-query';

export const Home: FC = () => {
  const data = useBookQuery();

  return (
    <Fragment>
      <BookList data={data} />
    </Fragment>
  );
};
