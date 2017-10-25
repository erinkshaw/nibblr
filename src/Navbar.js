import React from 'react';
import {NavLink} from 'react-router-dom'
import { Route, Switch } from 'react-router';
import Selections from './Selections'


class Navbar extends React.Component {

  render() {
    return (
      <div>
        {
          <NavLink activeClassName="active" to={`/selections`} style={{ textDecoration: 'none' }}>
            <nav className="navbar navbar-default">
              <button type="button" className="btn btn-outline-danger" style={{ fontSize: '50px' }}>
                <span className="font">What are you in the mood for?</span>
              </button>
            </nav>
          </NavLink>
        }
      </div>
    )
  }
}

export default Navbar
