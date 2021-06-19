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
        <Row justify="space-between" align="center">
          <Column>
            <Link to="/">
              <StyledLogo src={Logo} />
              <StyledPageTitle>Bookshelf</StyledPageTitle>
            </Link>
          </Column>
          <Column>
            {!user && (
              <StyledNavLink>
                <Link to="/login">Login</Link>
              </StyledNavLink>
            )}
            {user && (
              <StyledNavLink>
                <Link to="/bookshelf">My Bookshelf</Link>
              </StyledNavLink>
            )}
          </Column>
        </Row>
      </Container>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  background-color: #ffc800;
  font-weight: 700;
  font-size: 1.4rem;
`;

const StyledLogo = styled.img`
  max-height: 1.2em;
`;

const StyledPageTitle = styled.h1`
  font-weight: 700;
  font-size: 1.5em;
  display: inline-block;
  margin-left: 0.5em;
`;

const StyledNavLink = styled.div`
  font-size: 0.8em;

  a {
    text-decoration: none;
  }
`;
