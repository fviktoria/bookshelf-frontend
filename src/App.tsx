import Cookies from 'js-cookie';
import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Header } from './components/layout/header';
import { Home } from './pages/home';
import { Login } from './pages/login';
import GlobalStyle from './util/global-styles';
import { validate } from './util/validate';

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const validateToken = async () => {
      const token = Cookies.get('token');

      if (token) {
        try {
          const res = await validate(token);
          setIsLoggedIn(true);
        } catch (error) {
          console.log(error);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    validateToken();
  }, []);
  return (
    <Fragment>
      <GlobalStyle />
      <Header />
      <Router>
        <Route exact={true} path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Router>
    </Fragment>
  );
};

export default App;
