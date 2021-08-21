import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import NewCredentialPage from './pages/NewCredentialPage/NewCredentialPage';
import SearchCredentialPage from './pages/SearchCredentialPage/SearchCredentialPage';
import Password from './pages/Password/Password';
import DetailedCredential from './pages/DetailedCredential/DetailedCredential';
function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route path="/add">
          <NewCredentialPage />
        </Route>
        <Route path="/search">
          <SearchCredentialPage />
        </Route>
        <Route path="/credential/:credentialId">
          <DetailedCredential />
        </Route>
        <Route path="/service/:service">
          <Password />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
