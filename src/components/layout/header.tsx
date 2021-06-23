import { FC, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useUserContext } from '../../util/user-context';
import { Column } from './column';
import { Container } from './container';
import { Row } from './row';
import Logo from '../../assets/images/bookshelf-icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faBellSlash,
  faBook,
  faBookmark,
  faSignInAlt,
  faSignOutAlt,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { askNotificationPermission, isPermissionGranted } from '../../util/notifications';
import Cookies from 'js-cookie';

type HeaderProps = {
  isLoggedIn: boolean;
};

export const Header: FC<HeaderProps> = ({ isLoggedIn }) => {
  const user = useUserContext();
  const history = useHistory();
  const [permissionGranted, setPermissionGranted] = useState(isPermissionGranted());

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
            <StyledNavigation>
              <StyledNavLink>
                <Link to="/" title="All books">
                  <FontAwesomeIcon icon={faBook} />
                  All Books
                </Link>
              </StyledNavLink>
              {user && (
                <StyledNavLink>
                  <Link to="/bookshelf" title="My Bookshelf">
                    <FontAwesomeIcon icon={faBookmark} />
                    My Bookshelf
                  </Link>
                </StyledNavLink>
              )}
              {!user && (
                <StyledNavLink>
                  <Link to="/login">
                    <FontAwesomeIcon icon={faSignInAlt} />
                    Login
                  </Link>
                </StyledNavLink>
              )}
              {!user && (
                <StyledNavLink>
                  <Link to="/registration">
                    <FontAwesomeIcon icon={faUserPlus} />
                    Registration
                  </Link>
                </StyledNavLink>
              )}
            </StyledNavigation>
            {user && (
              <StyledToolBar>
                <StyledToolBarLink>
                  {permissionGranted ? (
                    <span>
                      <FontAwesomeIcon icon={faBell} />
                      Notifications on
                    </span>
                  ) : (
                    <span>
                      <FontAwesomeIcon
                        icon={faBellSlash}
                        onClick={() => {
                          if (askNotificationPermission()) setPermissionGranted(true);
                        }}
                      />
                      Notifications off
                    </span>
                  )}
                </StyledToolBarLink>
                <StyledToolBarLink
                  onClick={() => {
                    Cookies.remove('token');
                    history.push('/');
                  }}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  Logout
                </StyledToolBarLink>
              </StyledToolBar>
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

const StyledNavLink = styled.li`
  font-size: 0.8em;
  padding: 0.5em;

  a {
    text-decoration: none;
  }

  &:hover {
    cursor: pointer;
  }

  svg {
    margin-right: 0.2em;
  }
`;

const StyledNavigation = styled.ul`
  list-style-type: none;
  display: flex;
  align-items: center;
  margin: 0;
  justify-content: flex-end;
`;

const StyledToolBar = styled.ul`
  list-style-type: none;
  display: flex;
  align-items: center;
  margin: 0;
  justify-content: flex-end;
`;

const StyledToolBarLink = styled.li`
  font-size: 0.5em;
  padding: 0.5em;
  font-weight: 400;

  a {
    text-decoration: none;
  }

  &:hover {
    cursor: pointer;
  }

  svg {
    margin-right: 0.2em;
  }
`;
