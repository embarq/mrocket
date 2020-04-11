import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

import { AuthService } from '../lib/auth-service';
import Alert from '../components/Alert';
import FormField from '../components/FormField';
import './RegisterPage.css';

interface RegisterPageState {
  loading: boolean;
  loadingSuccess: boolean;
  loadingError: any
}

interface RegisterFormState {
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
}

export type RegisterPageProps = {};

function RegisterPage(props: React.PropsWithChildren<RegisterPageProps>) {
  const [registerPageState, setRegisterPageState] = useState<RegisterPageState>({
    loading: false,
    loadingError: null,
    loadingSuccess: false
  })
  const [registerFormState, setRegisterFormState] = useState<RegisterFormState>({
    email: '',
    password: '',
    passwordConfirm: '',
    firstName: '',
    lastName: ''
  });

  const trackFieldChange = (formStateKey: keyof RegisterFormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRegisterFormState({
        ...registerFormState,
        [formStateKey]: event.target.value
      });
    }

  const handleFormSubmit = () => {
    setRegisterPageState({
      ...registerPageState,
      loading: true,
      loadingError: null
    });

    const newUser = {...registerFormState};
    delete newUser.passwordConfirm;

    AuthService.Instance
      .register(newUser)
      .then(() => {
        setRegisterPageState({
          loading: false,
          loadingSuccess: true,
          loadingError: null
        });
      })
      .catch(err => {
        setRegisterPageState({
          loadingSuccess: false,
          loading: false,
          loadingError: err.code
        });
      });
  }

  const maybeShowRegisterErrorAlert = (error: string) => {
    switch (error) {
      case 'auth/email-already-in-use': return (
        <Alert theme="danger">User with the email you have provided is already exist</Alert>
      );
      case 'auth/invalid-email': return (
        <Alert theme="danger">Invalid email. Please, check the data you have entered</Alert>
      );
      case 'auth/weak-password': return (
        <Alert theme="danger">Password is too week. Please, create stronger password</Alert>
      );
      default: return null;
    }
  }

  if (registerPageState.loadingSuccess) {
    return <Redirect exact to="/auth/success" />;
  }

  return (
    <form onSubmit={e => e.preventDefault()} className="card border-0 login-content-card">
      <div className="card-header bg-white border-0">
        <h1 className="mt-3">Register</h1>
      </div>
      <div className="card-body flex-1 pb-1">
        <fieldset className="form-group">
          <FormField
            id="first-name"
            label="First Name"
            autoComplete={false}
            disabled={registerPageState.loading}
            onChange={trackFieldChange('firstName')}
            tabIndex={1} />
        </fieldset>
        <fieldset className="form-group">
          <FormField
            id="last-name"
            label="Last Name"
            autoComplete={false}
            disabled={registerPageState.loading}
            onChange={trackFieldChange('lastName')}
            tabIndex={2} />
        </fieldset>
        <fieldset className="form-group">
          <FormField
            id="email"
            type="email"
            label="Email"
            autoComplete={false}
            placeholder="example@org.com"
            disabled={registerPageState.loading}
            onChange={trackFieldChange('email')}
            tabIndex={3} />
        </fieldset>
        <fieldset className="form-group">
          <FormField
            id="password"
            type="password"
            label="Password"
            autoComplete={false}
            placeholder="••••••••"
            disabled={registerPageState.loading}
            onChange={trackFieldChange('password')}
            tabIndex={4} />
        </fieldset>
        <fieldset className="form-group">
          <FormField
            id="password-confirm"
            type="password"
            label="Confirm Password"
            autoComplete={false}
            disabled={registerPageState.loading}
            onChange={trackFieldChange('passwordConfirm')}
            tabIndex={5} />
        </fieldset>
        {maybeShowRegisterErrorAlert(registerPageState.loadingError)}
      </div>
      <div className="card-footer pt-0 bg-white border-0">
        <div className="d-flex justify-content-between">
          <Link to="/auth/login" tabIndex={7} className="btn btn-info">Login</Link>
          <button onClick={handleFormSubmit} tabIndex={6} type="submit" className="btn btn-primary">
            Register
            { registerPageState.loading &&
              <span className="spinner-border spinner-border-sm ml-2" role="status"></span> }
          </button>
        </div>
        <div className="text-center py-3">
          <button className="btn btn-link" type="button" tabIndex={8}>Forgot password? Click here to get help</button>
        </div>
      </div>
    </form>
  );
}

export default RegisterPage;