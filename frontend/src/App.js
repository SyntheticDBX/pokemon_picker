import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CreateTeam from './components/CreateTeam';
import RandomTeam from './components/RandomTeam';
import ViewTeam from './components/ViewTeam';
import Admin from './components/Admin';
import PageNotFound from './components/PageNotFound';
import Unauthorized from './components/Unauthorized';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  const [user, setUser] = useState('');

  useEffect(() => {
    fetch('/getUsername')
      .then(res => res.json())
      .then(userObj => setUser(userObj.username));
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/create-team">
          <CreateTeam />
        </Route>
        <Route path="/random-team">
          <RandomTeam />
        </Route>
        <Route path="/edit-team">
          <ViewTeam />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/unauthorized">
          <Unauthorized />
        </Route>
        <Route path="/">
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
