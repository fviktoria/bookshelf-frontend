import React, { FC } from 'react';
import styled from 'styled-components';
import { Column } from './column';
import { Container } from './container';
import { Row } from './row';

type HeaderProps = {
  isLoggedIn: boolean;
};

export const Header: FC<HeaderProps> = ({ isLoggedIn }) => {
  return (
    <StyledHeader>
      <Container wide>
        <Row>
          <Column>Bookshelf</Column>
          {!isLoggedIn && <Column>Login</Column>}
        </Row>
      </Container>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  background-color: #ffc800;
  padding: 1em;
  font-weight: 700;
  font-size: 1.4rem;
`;
