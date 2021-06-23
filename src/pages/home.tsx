import { FC, Fragment } from 'react';
import { BookList } from '../components/book-list/book-list';

export const Home: FC = () => {
  return (
    <Fragment>
      <BookList showAll={true} />
    </Fragment>
  );
};
