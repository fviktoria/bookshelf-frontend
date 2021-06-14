import Cookies from 'js-cookie';
import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { Header } from './components/layout/header';
import { Bookshelf } from './pages/bookshelf';
import { Home } from './pages/home';
import { Login } from './pages/login';
import GlobalStyle from './util/global-styles';
import { useValidateToken, validate } from './util/validate';

export const App = () => {
  const { data, error, isLoading } = useValidateToken();
  const isLoggedIn = data && data.data.status === 200 ? true : undefined;

  return (
    <Fragment>
      <GlobalStyle />
      <Header isLoggedIn={false} />
      {!isLoading && (
        <Router>
          <Route exact={true} path="/">
            <Home />
          </Route>
          <Route path="/login">{isLoggedIn ? <Redirect to="/" /> : <Login />}</Route>
          <Route path="/bookshelf">{!isLoggedIn ? <Redirect to="/login" /> : <Bookshelf />}</Route>
        </Router>
      )}
    </Fragment>
  );
};

export default App;
