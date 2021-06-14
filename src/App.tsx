import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { Fragment } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { Header } from './components/layout/header';
import { useUserQuery } from './hooks/queries/use-user-query';
import { Bookshelf } from './pages/bookshelf';
import { Home } from './pages/home';
import { Login } from './pages/login';
import GlobalStyle from './util/global-styles';
import { UserContext } from './util/user-context';
import { useValidateToken } from './util/validate';

type UserToken = {
  data: {
    user: {
      id: string;
    };
  };
};

export const App = () => {
  const token = Cookies.get('token');
  const decodedToken: UserToken | undefined = token ? jwtDecode(token) : undefined;
  const { user, isLoading, error } = useUserQuery(decodedToken?.data.user.id);

  return (
    <Fragment>
      <GlobalStyle />
      {!isLoading && (
        <UserContext.Provider value={user}>
          <Router>
            <Header isLoggedIn={false} />
            <Route exact={true} path="/">
              <Home />
            </Route>
            <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
            <Route path="/bookshelf">{!user ? <Redirect to="/login" /> : <Bookshelf />}</Route>
          </Router>
        </UserContext.Provider>
      )}
    </Fragment>
  );
};

export default App;
