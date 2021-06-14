import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useUserContext } from '../../util/user-context';
import { Column } from './column';
import { Container } from './container';
import { Row } from './row';
import Logo from '../../assets/images/bookshelf-icon.png';

type HeaderProps = {
  isLoggedIn: boolean;
};

export const Header: FC<HeaderProps> = ({ isLoggedIn }) => {
  const user = useUserContext();

  return (
    <StyledHeader>
      <Container wide>
        <Row>
          <Column width={10}>
            <Link to="/">
              <img src={Logo} />
            </Link>
          </Column>
          <Column>
            {!user && <Link to="/login">Login</Link>}
            {user && <Link to="/bookshelf">My Bookshelf</Link>}
          </Column>
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
