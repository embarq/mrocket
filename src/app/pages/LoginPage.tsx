import React from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  return (
    <div className="card border-0 login-content-card">
      <div className="card-header bg-white border-0">
        <h1 className="mt-3">Login</h1>
      </div>
      <div className="card-body flex-1">
        <form action="">
          <fieldset className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" autoComplete="off" placeholder="example@org.com" className="form-control"/>
          </fieldset>
          <fieldset className="form-group">
            <label htmlFor="password">Password</label>
            <input type="text" id="password" autoComplete="off" placeholder="••••••••" className="form-control"/>
          </fieldset>
        </form>
      </div>
      <div className="card-footer bg-white border-0">
        <div className="d-flex justify-content-between">
          <Link to="/auth/register" className="btn btn-info">Register</Link>
          <button className="btn btn-primary">Login</button>
        </div>
        <div className="text-center py-3">
          <button className="btn btn-link">Forgot password? Click here to get help</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;