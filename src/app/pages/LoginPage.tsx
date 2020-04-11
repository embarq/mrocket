import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './LoginPage.css';
import { AuthService } from '../lib/auth-service';
import Alert from '../components/Alert';

interface LoginPageState {
  loading: boolean,
  loadingError: any
}

interface LoginFormState {
  email: string;
  password: string;
}

function LoginPage() {
  const [loginPageState, setLoginPageState] = useState<LoginPageState>({
    loading: false,
    loadingError: null
  })
  const [loginFormState, setLoginFormState] = useState<LoginFormState>({
    email: '',
    password: ''
  });
  const [loginSuccess, setLoginSuccess] = useState(false);

  const trackFieldChange = (formStateKey: keyof LoginFormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLoginFormState({
        ...loginFormState,
        [formStateKey]: event.target.value
      });
    }

  const handleLoginSubmit = () => {
    setLoginPageState({
      loading: true,
      loadingError: null
    });

    AuthService.Instance
      .login(loginFormState)
      .then(() => {
        setLoginPageState({
          loading: false,
          loadingError: null
        });
        setLoginSuccess(true);
      })
      .catch(err => {
        setLoginPageState({
          loading: false,
          loadingError: err.code
        });
      });
  }

  const maybeShowLoginErrorAlert = (error: string) => {
    if (error === 'auth/user-not-found') {
      return <Alert theme="danger">
        <strong>Email or password is invalid</strong>
        <p>
          Please, check the data you have entered and try again
        </p>
      </Alert>
    }

    return null;
  }

  if (loginSuccess) {
    return <Redirect exact to="/app" />;
  }

  return (
    <form onSubmit={e => e.preventDefault()} className="card border-0 login-content-card">
      <div className="card-header bg-white border-0">
        <h1 className="mt-3">Login</h1>
      </div>
      <div className="card-body flex-1 pb-1">
        <fieldset className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            autoComplete="off"
            placeholder="example@org.com"
            className="form-control"
            disabled={loginPageState.loading}
            onChange={trackFieldChange('email')}/>
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            autoComplete="off"
            placeholder="••••••••"
            className="form-control"
            disabled={loginPageState.loading}
            onChange={trackFieldChange('password')}/>
        </fieldset>
        {maybeShowLoginErrorAlert(loginPageState.loadingError)}
      </div>
      <div className="card-footer pt-0 bg-white border-0">
        <div className="d-flex justify-content-between">
          <Link to="/auth/register" className="btn btn-info">Register</Link>
          <button onClick={handleLoginSubmit} type="submit" className="btn btn-primary">
            Login
            { loginPageState.loading &&
              <span className="spinner-border spinner-border-sm ml-2" role="status"></span> }
          </button>
        </div>
        <div className="text-center py-3">
          <button className="btn btn-link" type="button">Forgot password? Click here to get help</button>
        </div>
      </div>
    </form>
  );
}

export default LoginPage;