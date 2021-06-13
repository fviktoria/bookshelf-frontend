import { FC } from 'react';
import styled from 'styled-components';

export const Row: FC = ({ children }) => {
  return <StyledRow>{children}</StyledRow>;
};

const StyledRow = styled.div`
  display: flex;
`;
