import React from 'react';
import './LoginPage.css';

function LoginPage(props: React.PropsWithChildren<{}>) {
  return (
    <div>
      <pre>LoginPage</pre>
      {props.children}
    </div>
  );
}

export default LoginPage;