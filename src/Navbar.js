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
              <button type="button" className="btn btn-danger font" style={{ fontSize: '40px' }}>
                See your food!
              </button>
            </nav>
          </NavLink>

        }
      </div>
    )
  }
}

export default Navbar


          {/* this.props.location
          ? */}
          //if we are on selections, change navlink render HOWOSOOWO
        // <NavLink activeClassName="active" to={`/`} style={{ textDecoration: 'none' }}>
        //   <nav className="navbar navbar-default">
        //     <button type="button" className="btn btn-danger font" style={{ fontSize: '40px' }}>
        //       Choose more food!
        //     </button>
        //   </nav>
        // </NavLink>
