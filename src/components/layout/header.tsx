import React, { FC } from 'react';
import styled from 'styled-components';
import { Column } from './column';
import { Container } from './container';
import { Row } from './row';

export const Header: FC = () => {
  return (
    <StyledHeader>
      <Container wide>
        <Row>
          <Column>Bookshelf</Column>
          <Column>Login</Column>
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
