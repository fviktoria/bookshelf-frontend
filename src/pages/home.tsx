import { FC, Fragment, useState } from 'react';
import { BookList } from '../components/book-list/book-list';
import { useBookQuery } from '../hooks/queries/use-books-query';

export const Home: FC = () => {
  return (
    <Fragment>
      <BookList showAll={true} />
    </Fragment>
  );
};
