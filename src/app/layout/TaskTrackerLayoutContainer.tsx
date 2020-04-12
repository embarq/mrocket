import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch
} from 'react-router-dom';

import TaskTrackerPage from '../pages/TaskTrackerPage';
import TaskTrackerEditorPage from '../pages/TaskTrackerEditorPage';
import AppHeader from '../components/AppHeader';
import './TaskTrackerLayoutContainer.css';

export type TaskTrackerLayoutProps = {
  children: React.ReactNode;
};

function TaskTrackerLayout(props: TaskTrackerLayoutProps) {
  return (
    <React.Fragment>
      <AppHeader />
      <main className="app-main-wrapper">
        <div className="container">
          <div className="app-content">
            {props.children}
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}

function TaskTrackerLayoutContainer() {
  const { path } = useRouteMatch();

  return (
    <TaskTrackerLayout>
      <Switch>
        <Route path={`${ path }/tasks`} component={ TaskTrackerPage } />
        <Route path={`${ path }/tasks/:taskId`} component={ TaskTrackerEditorPage } />
        <Route exact path={path}>
          <Redirect to={`${ path }/tasks`} />
        </Route>
      </Switch>
    </TaskTrackerLayout>
  );
}

export default TaskTrackerLayoutContainer;
