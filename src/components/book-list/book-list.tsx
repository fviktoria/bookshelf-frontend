import React, { FC, useEffect, useState } from 'react';
import { mutate } from 'swr';
import { BookQueryRes, useBookQuery } from '../../hooks/queries/use-books-query';
import { Book } from '../../util/types/book';
import { Post } from '../../util/types/post';
import { useUserContext } from '../../util/user-context';
import { Container } from '../layout/container';
import { Pagination } from '../pagination/pagination';
import { BookListItem } from './book-list-item';

type BookListProps = {
  data: BookQueryRes;
  onPaginate: (e: React.MouseEvent<HTMLElement>) => void;
  currentPage: number;
};

export const BookList: FC<BookListProps> = ({ data, onPaginate, currentPage }) => {
  //const user = useUserContext();
  const { books, isLoading, headers } = data;

  const [totalPages, setTotalPages] = useState('0'); //headers && headers['x-wp-totalpages'];
  useEffect(() => {
    data.headers && setTotalPages(data.headers['x-wp-totalpages']);
  }, [data]);

  return (
    <Container wide>
      {!isLoading && books.map((book) => <BookListItem book={book} key={book.id} />)}
      <Pagination currentPage={currentPage} totalPages={parseInt(totalPages)} onClickItem={onPaginate} />
    </Container>
  );
};
