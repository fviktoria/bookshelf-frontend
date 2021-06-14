import { FC } from 'react';
import styled from 'styled-components';
import { PaginationItem } from './pagination-item';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onClickItem: (e: React.MouseEvent<HTMLElement>) => void;
};

export const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onClickItem }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  console.log('totalPages', pages);

  return (
    <StyledPagination>
      {pages.map((page) => (
        <PaginationItem number={page} active={currentPage === page} onClick={onClickItem} />
      ))}
    </StyledPagination>
  );
};

const StyledPagination = styled.ul`
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 2em 0;
  list-style-type: none;
`;
