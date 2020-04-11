import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import AuthGuardRedirect from './app/components/AuthGuardRedirect';
import AuthGuard from './app/components/AuthGuard';
import AuthLayout from './app/layout/AuthLayout';
import TaskTrackerLayout from './app/layout/TaskTrackerLayout';
import './App.css';

function App() {
  return <Router>
    <Switch>
      <Route path="/auth">
        <AuthLayout />
      </Route>
      <Route path="/app">
        <AuthGuard unauthorizedRedirect="/auth" >
          <TaskTrackerLayout />
        </AuthGuard>
      </Route>
      <Route path="/">
        <AuthGuardRedirect positive="/app" negative="/auth" />
      </Route>
    </Switch>
  </Router>
}

export default App;
