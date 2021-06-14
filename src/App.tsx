import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { Header } from './components/layout/header';
import { useUserQuery } from './hooks/queries/use-user-query';
import { Bookshelf } from './pages/bookshelf';
import { Home } from './pages/home';
import { Login } from './pages/login';
import GlobalStyle from './util/global-styles';
import { UserContext } from './util/user-context';
import { useValidateToken, validate } from './util/validate';

type UserToken = {
  data: {
    user: {
      id: string;
    };
  };
};

export const App = () => {
  const { data, error, isLoading } = useValidateToken();
  const isLoggedIn = data && data.data.status === 200 ? true : undefined;
  const token = Cookies.get('token');
  const decodedToken: UserToken | undefined = token ? jwtDecode(token) : undefined;
  const { user } = useUserQuery(decodedToken?.data.user.id);
  console.log('user', user);

  return (
    <Fragment>
      <GlobalStyle />
      <Header isLoggedIn={false} />
      {!isLoading && (
        <UserContext.Provider value={user}>
          <Router>
            <Route exact={true} path="/">
              <Home />
            </Route>
            <Route path="/login">{isLoggedIn ? <Redirect to="/" /> : <Login />}</Route>
            <Route path="/bookshelf">{!isLoggedIn ? <Redirect to="/login" /> : <Bookshelf />}</Route>
          </Router>
        </UserContext.Provider>
      )}
    </Fragment>
  );
};

export default App;
