import React from 'react';
import './RegisterPage.css';

export type RegisterPageProps = {};

function RegisterPage(props: React.PropsWithChildren<RegisterPageProps>) {
  return (
    <div>
      <pre>RegisterPage</pre>
      {props.children}
    </div>
  );
}

export default RegisterPage;