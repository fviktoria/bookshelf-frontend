import { FC } from 'react';
import { BookList } from '../components/book-list/book-list';

export const Bookshelf: FC = () => {
  return (
    <div>
      My Bookshelf
      <BookList />
    </div>
  );
};
