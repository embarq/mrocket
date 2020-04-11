import React from 'react';
import './RegisterSuccessPage.css';

export type RegisterSuccessPageProps = {};

function RegisterSuccessPage(props: React.PropsWithChildren<RegisterSuccessPageProps>) {
  return (
    <div>
      <pre>RegisterSuccessPage</pre>
      {props.children}
    </div>
  );
}

export default RegisterSuccessPage;