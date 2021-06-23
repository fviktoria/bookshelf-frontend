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
  margin: 0;
  padding: 0;
`;
