import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { mutate } from 'swr';
import { BookQueryRes, useBookQuery } from '../../hooks/queries/use-books-query';
import { useGenreQuery } from '../../hooks/queries/use-genre-query';
import { Book } from '../../util/types/book';
import { Post } from '../../util/types/post';
import { useUserContext } from '../../util/user-context';
import { Column } from '../layout/column';
import { Container } from '../layout/container';
import { Row } from '../layout/row';
import { Pagination } from '../pagination/pagination';
import { BookFilters } from './book-filters';
import { BookListItem } from './book-list-item';

type BookListProps = {
  showAll?: boolean;
};

export const BookList: FC<BookListProps> = ({ showAll = false }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  //const location = useLocation();
  const user = useUserContext();
  const data = useBookQuery(showAll ? undefined : user && user.acf?.books, currentPage, selectedGenres);
  const { books, isLoading, headers } = data;
  const { genres } = useGenreQuery();

  const [totalPages, setTotalPages] = useState('0'); //headers && headers['x-wp-totalpages'];
  useEffect(() => {
    data.headers && setTotalPages(data.headers['x-wp-totalpages']);
  }, [data]);

  return (
    <Container wide>
      <Row>
        {/* <Column width={30}>{genres && <BookFilters filters={genres} onFilter={onFilter} />}</Column> */}
        <Column width={70}>
          {!isLoading && books.map((book) => <BookListItem book={book} key={book.ID} />)}
          {/* <Pagination currentPage={currentPage} totalPages={parseInt(totalPages)} onClickItem={onPaginate} /> */}
        </Column>
      </Row>
    </Container>
  );
};
