import React from 'react'
import {NavLink} from 'react-router-dom'

function Restaurant(props) {

  function makeGooglePlacesPhotoURL (photoReference, key) {
    var baseURL = 'https://maps.googleapis.com/maps/api/place/photo?';
    var maxHeight = 200;
    var fullURL = baseURL + 'key=' + key + '&' + 'maxheight=' + maxHeight + '&' + 'photoreference=' + photoReference;
    return fullURL;
  }

  return (
    <div>
      {props && props ?

        <div className="row restaurant">
        <div className="col-md-1">
          </div>
          <div className="col-md-3">
          <iframe
                width="450"
                height="300"
                frameBorder="0" style={{ border: '0p'  }}
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBiwzfKUcjy9xK8dnd8ozEVrB-elJY5fCs&q=place_id:${props.place.place_id}`} allowfullscreen>
              </iframe>
          </div>
          <div className="col-md-3"><img
            className="restaurant-img"
            src ={makeGooglePlacesPhotoURL(props.place.photos[0].photo_reference, 'AIzaSyBv6nWAWnIZgBvtLWsCCSbSjL5DvVhPKEo')} /></div>
          <div className="col-md-3 restaurant"><div><strong>{props.place.name}</strong></div><div>{props.place.vicinity}</div>
          {props.place.opening_hours.open_now ?
          <div>It's open now!</div> :
          <div>It's closed for now :(</div>
          }
          </div>
        </div>
        : <NavLink activeClassName="active" to={`/`} style={{ textDecoration: 'none' }}>Go back and swipe!</NavLink>
      }
      </div>

    )
}

export default Restaurant
