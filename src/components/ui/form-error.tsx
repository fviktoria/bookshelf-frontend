import { FC } from 'react';
import styled from 'styled-components';

export const FormError: FC = ({ children }) => {
  return <StyledFormError>{children}</StyledFormError>;
};

const StyledFormError = styled.div`
  background-color: #e8caca;
  padding: 0.5em;
  border-radius: 0.5em;
  font-weight: 700;
`;
