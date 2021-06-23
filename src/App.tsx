import { Fragment } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { Header } from './components/layout/header';
import { Book } from './pages/book';
import { Bookshelf } from './pages/bookshelf';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { Registration } from './pages/registration';
import GlobalStyle from './util/global-styles';
import { UserContextConsumer, UserContextProvider, useUserContext } from './util/user-context';

export const App = () => {
  return (
    <Fragment>
      <GlobalStyle />
      <UserContextProvider>
        <UserContextConsumer>
          {({ user, userLoading, error }: any) => (
            <Router>
              <Header isLoggedIn={false} />
              <Route exact={true} path="/">
                <Home />
              </Route>
              <Route path="/login">{!error && user ? <Redirect to="/" /> : <Login />}</Route>
              {userLoading !== undefined && !userLoading && (
                <Route path="/bookshelf">{!user ? <Redirect to="/login" /> : <Bookshelf />}</Route>
              )}
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
