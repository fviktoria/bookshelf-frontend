import React, { FC, useEffect, useState } from 'react';
import { mutate } from 'swr';
import { BookQueryRes, useBookQuery } from '../../hooks/queries/use-books-query';
import { useGenreQuery } from '../../hooks/queries/use-genre-query';
import { Book } from '../../util/types/book';
import { Post } from '../../util/types/post';
import { useUserContext } from '../../util/user-context';
import { Container } from '../layout/container';
import { Pagination } from '../pagination/pagination';
import { BookFilters } from './book-filters';
import { BookListItem } from './book-list-item';

type BookListProps = {
  data: BookQueryRes;
  onPaginate: (e: React.MouseEvent<HTMLElement>) => void;
  currentPage: number;
  selectedGenres?: Array<number>;
  onFilter?: (e: React.ChangeEvent<HTMLElement>) => void;
};

export const BookList: FC<BookListProps> = ({ data, onPaginate, currentPage, onFilter }) => {
  //const user = useUserContext();
  const { books, isLoading, headers } = data;
  const { genres } = useGenreQuery();

  const [totalPages, setTotalPages] = useState('0'); //headers && headers['x-wp-totalpages'];
  useEffect(() => {
    data.headers && setTotalPages(data.headers['x-wp-totalpages']);
  }, [data]);

  return (
    <Container wide>
      {genres && <BookFilters filters={genres} onFilter={onFilter} />}
      {!isLoading && books.map((book) => <BookListItem book={book} key={book.ID} />)}
      <Pagination currentPage={currentPage} totalPages={parseInt(totalPages)} onClickItem={onPaginate} />
    </Container>
  );
};
