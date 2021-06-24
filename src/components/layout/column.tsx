import { FC } from 'react';
import styled from 'styled-components';

type ColumnProps = {
  colWidth?: number;
};

export const Column: FC<ColumnProps> = ({ colWidth, children }) => {
  return <StyledColumn colWidth={colWidth}>{children}</StyledColumn>;
};

const StyledColumn = styled.div<ColumnProps>`
  ${({ colWidth }) => colWidth && 'width:' + colWidth + '%'};

  @media screen and (max-width: 768px) {
    width: 100%;
    flex-wrap: wrap;
  }
`;
