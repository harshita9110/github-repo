import React from 'react';
import { OwnerRepositories } from './containers/OwnerRepositories';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/:project" component={OwnerRepositories} />
          <Route path="/" component={OwnerRepositories} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
