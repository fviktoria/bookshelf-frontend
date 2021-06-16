import { FC } from 'react';
import styled from 'styled-components';
import { BookGenre } from '../../util/types/book-genre';

type BookFilterItemProps = {
  filter: BookGenre;
  onFilter?: (e: React.ChangeEvent<HTMLElement>) => void;
};

export const BookFilterItem: FC<BookFilterItemProps> = ({ filter, onFilter }) => {
  return (
    <StyledBookFilterItem>
      <label>
        <input type="checkbox" name={filter.taxonomy} value={filter.term_id} onChange={onFilter} />
        {filter.name}
      </label>
    </StyledBookFilterItem>
  );
};

const StyledBookFilterItem = styled.li``;
