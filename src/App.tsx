import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import AuthGuardRedirect from './app/components/AuthGuardRedirect';
import AuthGuard from './app/components/AuthGuard';
import AuthLayoutContainer from './app/layout/AuthLayoutContainer';
import TaskTrackerLayoutContainer from './app/layout/TaskTrackerLayoutContainer';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/yeti/bootstrap.min.css';
import './App.css';

function App() {
  return <div className="mrocket-app">
    <Router>
      <Switch>
        <Route path="/auth">
          <AuthLayoutContainer />
        </Route>
        <Route path="/app">
          <AuthGuard unauthorizedRedirect="/auth" >
            <TaskTrackerLayoutContainer />
          </AuthGuard>
        </Route>
        <Route exact path="/">
          <AuthGuardRedirect positive="/app" negative="/auth" />
        </Route>
      </Switch>
    </Router>
  </div>
}

export default App;
