import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Restaurant from './Restaurant'
import { connect } from 'react-redux'
import store from './store'
import { List } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'


class Selections extends Component {

  render() {
    const { selections, places, placesMap } = this.props
    return (
      <div>
        <div className="container">
          <NavLink activeClassName="active" to={`/`} >
            <img src="/img/salad.svg"
            className="shiver"
            id="getCards" />
          </NavLink>
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
