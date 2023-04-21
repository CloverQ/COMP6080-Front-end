import React from 'react';
import { Route, Redirect, BrowserRouter, Switch } from 'react-router-dom';
import Login from './views/Login';
import Register from './views/Register';
import Dashboard from './views/Dashboard';
import CreateGame from './views/CreateGame';
import EditGame from './views/EditGame';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditQuiz from './views/EditQuiz';
import GameResult from './views/GameResult';
import JoinGame from './views/JoinGame';
import PlayGame from './views/PlayGame';

function App () {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/dashboard'>
            <Dashboard />
          </Route>
          <Route path='/create'>
            <CreateGame />
          </Route>
          <Route path="/edit/:gid">
            <EditGame />
          </Route>
          <Route path="/edit/:gid/:qid">
            <EditQuiz />
          </Route>
          <Route path="/results/:sid">
            <GameResult />
          </Route>
          <Route path="/join/:sid">
            <JoinGame />
          </Route>
          <Route path="/join">
            <JoinGame />
          </Route>
          <Route path="/play/:pid">
            <PlayGame />
          </Route>
          <Route path="/play">
            <PlayGame />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

function Home () {
  return (
    <div>
      <h1>Home</h1>
      <Route exact path='/'>
        {localStorage.getItem('token') ? <Redirect to='/dashboard' /> : <Redirect to='/login' />}
      </Route>
    </div>
  );
}

export default App;
