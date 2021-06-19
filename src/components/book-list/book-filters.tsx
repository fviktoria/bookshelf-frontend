import { FC } from 'react';
import styled from 'styled-components';
import { BookGenre } from '../../util/types/book-genre';
import { BookFilterItem } from './book-filter-item';

type BookFiltersProps = {
  filters: BookGenre[];
  onFilter?: (e: React.ChangeEvent<HTMLElement>) => void;
};

export const BookFilters: FC<BookFiltersProps> = ({ filters, onFilter }) => {
  return (
    <StyledBookFilters>
      {filters.map((item) => (
        <BookFilterItem filter={item} key={item.term_id} onFilter={onFilter} />
      ))}
    </StyledBookFilters>
  );
};

const StyledBookFilters = styled.ul`
  list-style-type: none;
  padding: 1em;
  margin-top: 1.5em;
  margin-right: 2em;
  background-color: #f0f0f0;
  border-radius: 1em;
`;
