import React from 'react'
import {GoogleApiWrapper} from 'google-maps-react'

export class Container extends React.Component {
  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    return (
      <div>Map will go here</div>
    )
  }
}

export default GoogleApiComponent({
  apiKey: 'AIzaSyBv6nWAWnIZgBvtLWsCCSbSjL5DvVhPKEo'
})(Container)
