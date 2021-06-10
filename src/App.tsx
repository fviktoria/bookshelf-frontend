import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home } from './pages/home';

export const App = () => {
  return (
    <Router>
      <Route path="/">
        <Home/>
      </Route>
    </Router>
  );
}

export default App;
