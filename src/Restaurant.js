import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import store, { gettingImage } from './store'


export default class Restaurant extends Component {

  makeGooglePlacesPhotoURL(photoReference, key) {
    var baseURL = 'https://maps.googleapis.com/maps/api/place/photo?';
    var maxHeight = 200;
    var fullURL = baseURL + 'key=' + key + '&' + 'maxheight=' + maxHeight + '&' + 'photoreference=' + photoReference;
    return fullURL;
  }
  constructor(props) {
    super(props)
    this.state = store.getState() || {};
    this.makeGooglePlacesPhotoURL = this.makeGooglePlacesPhotoURL.bind(this)
  }

  componentDidMount() {
    store.dispatch(gettingImage(this.props.place.photos[0].photo_reference))
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    }
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }
  render() {
    console.log(this.state)
    return (
      <div className="container-fluid">
        {this.props && this.props ?

          <div className="row restaurant">
            <div className="col-md-4"><img
              className="restaurant-img"
              src={this.makeGooglePlacesPhotoURL(this.props.place.photos[0].photo_reference, 'AIzaSyBv6nWAWnIZgBvtLWsCCSbSjL5DvVhPKEo')}
            />
            </div>

            <div className="col-md-4 restaurant"><div><span style={{ fontSize: 40 }}>{this.props.place.name}</span></div><div>{this.props.place.vicinity}</div>
              {this.props.place.opening_hours ? (this.props.place.opening_hours.open_now ?
                <div>It's open now!</div> :
                <div>It's closed for now :(</div>) : null
              }
            </div>
            <div className="col-md-4">
              <iframe className="mappad"
                width="450"
                height="250"
                frameBorder="0" style={{ border: '0p' }}
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBiwzfKUcjy9xK8dnd8ozEVrB-elJY5fCs&q=place_id:${this.props.place.place_id}`} >
              </iframe>
            </div>
          </div>
          : <NavLink activeClassName="active" to={`/`} style={{ textDecoration: 'none' }}>Go back and swipe!</NavLink>
        }
      </div>

    )
  }
}

