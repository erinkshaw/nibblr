import React from 'react'


function Restaurant(props) {

  function makeGooglePlacesPhotoURL (photoReference, key) {
    var baseURL = 'https://maps.googleapis.com/maps/api/place/photo?';
    var maxHeight = 4000;
    var fullURL = baseURL + 'key=' + key + '&' + 'maxheight=' + maxHeight + '&' + 'photoreference=' + photoReference;
    return fullURL;
  }

  if (props) console.log(props.place, 'PROPPSPSPSPP')
  // const url = makeGooglePlacesPhotoURL(props.photos[0].photo_reference, 'AIzaSyBv6nWAWnIZgBvtLWsCCSbSjL5DvVhPKEo')
    return (
      <div>
      {props && props ?
        <div className="restaurant">
          <div className="restaurant-img">
            <img
            className="restaurant-img"
            src ={makeGooglePlacesPhotoURL(props.place.photos[0].photo_reference, 'AIzaSyBv6nWAWnIZgBvtLWsCCSbSjL5DvVhPKEo')} />
        <div>{props.place.name}</div>
        <div>{props.place.vicinity}</div>
          </div>
        </div>
        : null
      }
      </div>

    )
}

export default Restaurant
