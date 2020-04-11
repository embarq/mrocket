import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch
} from "react-router-dom";

import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import RegisterSuccessPage from '../pages/RegisterSuccessPage';
import './AuthLayout.css';

interface AuthLayoutProps {
  children: React.ReactNode
}

function AuthLayout(props: AuthLayoutProps) {
  return (
    <div className="auth-main-wrapper">
      <div className="container">
        <div className="auth-content">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export type AuthLayoutContainerProps = unknown;

function AuthLayoutContainer(props: AuthLayoutContainerProps) {
  const { path } = useRouteMatch();

  return (
    <AuthLayout>
      <Switch>
        <Route exact path={`${ path }/login`} component={ LoginPage } />
        <Route exact path={`${ path }/register`} component={ RegisterPage } />
        <Route exact path={`${ path }/success`} component={ RegisterSuccessPage } />
        <Route exact path={path}>
          <Redirect to={`${ path }/login`}></Redirect>
        </Route>
      </Switch>
    </AuthLayout>
  );
}

export default AuthLayoutContainer;
