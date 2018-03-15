import React, { Component } from 'react'
import Restaurant from './Restaurant'
import { connect } from 'react-redux'
import store from './store'
import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import {NavLink} from 'react-router-dom'



class Selections extends Component {

  render() {
    const { selections, places, placesMap } = this.props
    return (
      <div>
        {/* temp solution to be able to nav back to main */}
        <NavLink activeClassName="active" to={`/`} style={{ textDecoration: 'none' }}>
          <nav className="navbar navbar-default">
            <button type="button" className="btn btn-outline-danger" style={{ fontSize: '50px'  }}>
              <span className="font">Go back and swipe some more!</span>
            </button>
          </nav>
        </NavLink>
        <div className="container">
          <div id="chatbox">
            {!selections.length
              ? <h1 className="middle">You haven't swiped anything yet!</h1> :
              <List>
                <Subheader>{`Messages: ${selections.length}`}</Subheader>
                {selections.map((image, i) => {
                  const placeId = placesMap[image.photo_reference]
                  const place = places.find(place => place.place_id === placeId)
                  return <Restaurant key={i} place={place} photoReference={image.photo_reference} />
                }
                )}
              </List>
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    places: state.places,
    selections: state.selections,
    placesMap: state.placesMap
  }
}

export default connect(mapStateToProps)(Selections);
