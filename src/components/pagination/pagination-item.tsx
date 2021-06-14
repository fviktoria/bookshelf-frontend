import React, { FC, MouseEventHandler } from 'react';
import styled from 'styled-components';

type PaginationItemProps = {
  number: number;
  active: boolean;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

export const PaginationItem: FC<PaginationItemProps> = ({ number, active, onClick }) => {
  return (
    <StyledPaginationItem active={active} onClick={onClick}>
      {number}
    </StyledPaginationItem>
  );
};

type StyledPaginationItemProps = {
  active: boolean;
};

const StyledPaginationItem = styled.li<StyledPaginationItemProps>`
  background-color: #dedede;
  margin: 0.2em;
  padding: 0.2em 0.5em;
  border-radius: 0.2em;
  font-weight: ${({ active }) => (active ? 700 : 400)};
`;
