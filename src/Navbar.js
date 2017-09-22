import React from 'react';
import {NavLink} from 'react-router-dom'
import Selections from './Selections'

class Navbar extends React.Component {

  render() {

    return (
      <div>
        <NavLink activeClassName="active" to={`/selections`} style={{ textDecoration: 'none' }}>
      <nav className="navbar navbar-default">
          <button type="button" className="btn btn-danger" style={{ fontSize: '40px' }}>
            See your food!
          </button>
      </nav>
        </NavLink>
      </div>
    )
  }
}

export default Navbar
