import { FC } from 'react';
import styled from 'styled-components';

type RowProps = {
  justify?: 'space-between' | 'center';
  align?: 'center';
};

export const Row: FC<RowProps> = ({ justify, align, children }) => {
  return (
    <StyledRow justify={justify} align={align}>
      {children}
    </StyledRow>
  );
};

const StyledRow = styled.div<RowProps>`
  display: flex;
  ${({ justify }) => justify && 'justify-content:' + justify};
  ${({ align }) => align && 'align-items:' + align};
`;
