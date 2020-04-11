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
    <Router>
      <AuthLayout>
        <Switch>
          <Route exact path={`${ path }/login`}>
            <LoginPage />
          </Route>
          <Route exact path={`${ path }/register`}>
            <RegisterPage />
          </Route>
          <Route exact path={`${ path }/success`}>
            <RegisterSuccessPage />
          </Route>
          <Route exact path={path}>
            <Redirect to={`${ path }/login`}></Redirect>
          </Route>
        </Switch>
      </AuthLayout>
    </Router>
  );
}

export default AuthLayoutContainer;
