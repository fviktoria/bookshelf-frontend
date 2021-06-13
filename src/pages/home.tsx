import React, { FC, useEffect } from 'react';
import { useBookQuery } from '../hooks/queries/use-books-query';
import { fetcher } from '../util/fetcher';

export const Home: FC = () => {
  const { books } = useBookQuery();
  console.log(books);

  return <div>Home</div>;
};
