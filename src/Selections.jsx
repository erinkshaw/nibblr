import React, { Component } from 'react'
import Restaurant from './Restaurant'
import NavHome from './NavHome'
import { connect } from 'react-redux'
import store from './store'

class Selections extends Component {

  render() {
    const { selections, places, placesMap } = this.props
    return (
      <div className="padBottom">
        <NavHome />
        {!selections.length
        ? <h1 className="middle">You haven't swiped anything yet!</h1> :
        selections.map((image, i) => {
          const placeId = placesMap[image.photo_reference]
          const place = places.find(place =>  place.place_id === placeId)
        return <Restaurant key={i} place={place} photoReference={image.photo_reference}/>}
        )}
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
