import { FC } from 'react';
import styled from 'styled-components';

export const Column: FC = ({ children }) => {
  return <StyledColumn>{children}</StyledColumn>;
};

const StyledColumn = styled.div``;
