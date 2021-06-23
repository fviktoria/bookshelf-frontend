import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { Fragment, useMemo } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { Header } from './components/layout/header';
import { useUserQuery } from './hooks/queries/use-user-query';
import { Book } from './pages/book';
import { Bookshelf } from './pages/bookshelf';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { Registration } from './pages/registration';
import GlobalStyle from './util/global-styles';
import { UserToken } from './util/types/user-token';
import { UserContextConsumer, UserContextProvider, useUserContext } from './util/user-context';

export const App = () => {
  const { user, error } = useUserContext();

  return (
    <Fragment>
      <GlobalStyle />
      <UserContextProvider>
        <UserContextConsumer>
          {({ user }: any) => (
            <Router>
              <Header isLoggedIn={false} />
              <Route exact={true} path="/">
                <Home />
              </Route>
              <Route path="/login">{!error && user ? <Redirect to="/" /> : <Login />}</Route>
              <Route path="/bookshelf">{!user ? <Redirect to="/login" /> : <Bookshelf />}</Route>
              <Route path="/book/:id">
                <Book />
              </Route>
              <Route path="/registration">{!error && user ? <Redirect to="/login" /> : <Registration />}</Route>
            </Router>
          )}
        </UserContextConsumer>
      </UserContextProvider>
    </Fragment>
  );
};

export default App;
