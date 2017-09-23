import React from 'react';
import {NavLink} from 'react-router-dom'
import { Route, Switch } from 'react-router';
import Selections from './Selections'


function NavHome() {

  return (
    <div>
      {
        <NavLink activeClassName="active" to={`/`} style={{ textDecoration: 'none' }}>
          <nav className="navbar navbar-default">
            <button type="button" className="btn btn-outline-danger" style={{ fontSize: '50px'  }}>
              <span className="font">Go back and swipe some more!</span>
            </button>
          </nav>
        </NavLink>
      }
    </div>
  )
}

export default NavHome
