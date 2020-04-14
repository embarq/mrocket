import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch} from 'react-router-dom';

import TaskTrackerPage from '../pages/TaskTrackerPage';
import TaskTrackerEditorPage from '../pages/TaskTrackerEditorPage';

import './TaskTrackerLayoutContainer.css';
import AppHeader from '../components/AppHeader';

function TaskTrackerLayoutContainer() {
  const { path } = useRouteMatch();

  return (
    <React.Fragment>
      <AppHeader />
      <Switch>
        <Route exact path={`${ path }/tasks`} component={ TaskTrackerPage } />
        <Route path={`${ path }/tasks/:taskId`} component={ TaskTrackerEditorPage } />
        <Route exact path={path}>
          <Redirect to={`${ path }/tasks`} />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default TaskTrackerLayoutContainer;
