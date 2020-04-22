import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthService } from '../lib/auth-service';

import './AppHeader.css';

function AppHeader() {
  const history = useHistory();

  const onLogout = () => {
    AuthService.Instance.logout()
      .then(() => {
        history.push('/auth/login');
      })
      .catch(err => console.error(err));
  }

  return (
    <header className="container" id="app-header">
      <nav className="navbar navbar-dark bg-transparent">
        <Link className="navbar-brand" to="/app">
          <b>M</b>Rocket
        </Link>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item" title="Create todo">
            <Link to="/app/tasks/new" className="btn nav-link btn-add">+
            </Link>
          </li>
          <li className="nav-item">
            <button type="button" className="btn nav-link">
              Help
            </button>
          </li>
          <li className="nav-item">
            <button onClick={onLogout} type="button" className="btn nav-link">
              Logout
            </button>
          </li>
        </ul>
      </nav>

    </header>
  )
}

export default AppHeader;