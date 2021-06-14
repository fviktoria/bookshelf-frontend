import { FC } from 'react';
import { useBookQuery } from '../hooks/queries/use-books-query';

export const Home: FC = () => {
  const { books } = useBookQuery();

  return <div>huh?</div>;
};
