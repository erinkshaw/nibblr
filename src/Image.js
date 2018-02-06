import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'

export default class Image extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // url: ''
    }
  }

  componentDidMount() {
    fetch(`/api/places/img/${this.props.photoReference}`)
      .then( res => res.json())
      .then(url => this.setState({ url }))
  }

  render() {
    return (
      this.state.url ? <img src={this.state.url}/> : null
    )
  }
}
