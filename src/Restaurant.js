import React, { Component } from 'react'
import store from './store'
// import Image from './Image'
import Map from './Map'

export default class Restaurant extends Component {

  render() {
    return (
      <div className="container-fluid">
        {this.props && this.props ?

          <div className="row restaurant">
            <div className="col-md-4">
              {/* <Image photoReference={this.props.place.photos[0].photo_reference} /> */}
            </div>

            <div className="col-md-4 restaurant"><div><span style={{ fontSize: 40 }}>{this.props.place.name}</span></div><div>{this.props.place.vicinity}</div>
              {this.props.place.opening_hours ? (this.props.place.opening_hours.open_now ?
                <div>It's open now!</div> :
                <div>It's closed for now :(</div>) : null
              }
            </div>
            <div className="col-md-4">
              <Map placeId={this.props.place.place_id}/>
            </div>
          </div>
          : <NavLink activeClassName="active" to={`/`} style={{ textDecoration: 'none' }}>Go back and swipe!</NavLink>
        }
      </div>

    )
  }
}

