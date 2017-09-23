import React from 'react'
import {NavLink} from 'react-router-dom'

function Restaurant(props) {

  function makeGooglePlacesPhotoURL (photoReference, key) {
    var baseURL = 'https://maps.googleapis.com/maps/api/place/photo?';
    var maxHeight = 4000;
    var fullURL = baseURL + 'key=' + key + '&' + 'maxheight=' + maxHeight + '&' + 'photoreference=' + photoReference;
    return fullURL;
  }

  return (
    <div>
      {props && props ?

        <div className="row restaurant">
          <div className="col-md-3"></div>
          <div className="col-md-3"><img
            className="restaurant-img"
            src ={makeGooglePlacesPhotoURL(props.place.photos[0].photo_reference, 'AIzaSyBv6nWAWnIZgBvtLWsCCSbSjL5DvVhPKEo')} /></div>
          <div className="col-md-3 restaurant"><div>{props.place.name}</div><div>{props.place.vicinity}</div></div>
          <div className="col-md-3 restaurant"></div>
        </div>
        : <NavLink activeClassName="active" to={`/`} style={{ textDecoration: 'none' }}>Go back and swipe!</NavLink>
      }
      </div>

    )
}

export default Restaurant
