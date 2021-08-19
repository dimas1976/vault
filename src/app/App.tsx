import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Password from './pages/Password/Password';
function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route path="/password/:service">
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
