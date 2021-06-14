import { FC } from 'react';
import styled from 'styled-components';

type ColumnProps = {
  width?: number;
};

export const Column: FC<ColumnProps> = ({ width = 100, children }) => {
  return <StyledColumn width={width}>{children}</StyledColumn>;
};

const StyledColumn = styled.div<ColumnProps>`
  width: ${({ width }) => width + '%'};
`;
