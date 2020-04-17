import React from 'react';
import { Link } from 'react-router-dom';

import './AppHeader.css';

function AppHeader() {
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
            <button type="button" className="btn nav-link">
              Logout
            </button>
          </li>
        </ul>
      </nav>

    </header>
  )
}

export default AppHeader;