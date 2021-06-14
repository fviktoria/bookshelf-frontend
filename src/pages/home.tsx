import { FC, Fragment, useEffect, useState } from 'react';
import { BookList } from '../components/book-list/book-list';
import { useBookQuery } from '../hooks/queries/use-books-query';

export const Home: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const data = useBookQuery(undefined, currentPage);

  return (
    <Fragment>
      <BookList
        data={data}
        onPaginate={(e) => {
          setCurrentPage(parseInt((e.target as HTMLElement).innerHTML));
        }}
        currentPage={currentPage}
      />
    </Fragment>
  );
};
