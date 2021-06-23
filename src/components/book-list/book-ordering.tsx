import { FC } from 'react';
import styled from 'styled-components';

type BookOrderingProps = {
  onOrder: (e: React.ChangeEvent<HTMLElement>) => void;
};

export const BookOrdering: FC<BookOrderingProps> = ({ onOrder }) => {
  return (
    <StlyedBookOrdering>
      <select onChange={onOrder} name="orderBy">
        <option value="default">Order by</option>
        <option value="date">Date added</option>
        <option value="title">Title</option>
      </select>
      <select onChange={onOrder} name="order">
        <option value="default">Order</option>
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
      </select>
    </StlyedBookOrdering>
  );
};

const StlyedBookOrdering = styled.div`
  display: flex;
  gap: 0.2em;
`;
