import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch} from 'react-router-dom';

import TaskTrackerPage from '../pages/TaskTrackerPage';
import TaskTrackerEditorPage from '../pages/TaskTrackerEditorPage';
import AppHeader from '../components/AppHeader';
import TaskTrackerEditorToolbar from '../components/TaskTrackerEditorToolbar';
import TaskTrackerToolbar from '../components/TaskTrackerToolbar';

import './TaskTrackerLayoutContainer.css';

export type TaskTrackerLayoutProps = {
  children: React.ReactNode;
  toolbarChildren: React.ReactNode;
};

function TaskTrackerLayout(props: TaskTrackerLayoutProps) {
  return (
    <React.Fragment>
      <AppHeader />
      <main className="app-main-wrapper">
        <div className="app-content toolbar-content">
          {props.toolbarChildren}
        </div>
        <div className="spacer pt-4"></div>
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
  const RoutedToolbar = (
    <Switch>
      <Route exact path={`${ path }/tasks`} component={ TaskTrackerToolbar } />
      <Route exact path={`${ path }/tasks/:taskId`} component={ TaskTrackerEditorToolbar } />
    </Switch>
  );

  return (
    <TaskTrackerLayout toolbarChildren={RoutedToolbar}>
      <Switch>
        <Route exact path={`${ path }/tasks`} component={ TaskTrackerPage } />
        <Route path={`${ path }/tasks/:taskId`} component={ TaskTrackerEditorPage } />
        <Route exact path={path}>
          <Redirect to={`${ path }/tasks`} />
        </Route>
      </Switch>
    </TaskTrackerLayout>
  );
}

export default TaskTrackerLayoutContainer;
