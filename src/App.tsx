import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Authentication from './screens/Authentication';
import Dashboard from './screens/Dashboard';
import { StateType } from './reducers';
import NavBar from './components/NavBar';

const App: React.FC = () => {
  const authenticated = useSelector((state: StateType) => state.authenticated);

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Switch>
          {authenticated ? (
            <>
              <Route path="/">
                <Dashboard />
              </Route>
              <Route>
                <Redirect to="/" />
              </Route>
            </>
          ) : (
            <>
              <Route path="/authentication">
                <Authentication />
              </Route>
              <Route>
                <Redirect to="/authentication" />
              </Route>
            </>
          )}
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
