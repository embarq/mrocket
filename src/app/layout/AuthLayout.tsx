import React from 'react';
import './AuthLayout.css';

export type AuthLayoutProps = {};

function AuthLayout(props: React.PropsWithChildren<AuthLayoutProps>) {
  return (
    <div>
      <pre>AuthLayout</pre>
      {props.children}
    </div>
  );
}

export default AuthLayout;
