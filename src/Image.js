import React, { Component } from 'react'

export default class Image extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: ''
    }
  }

  componentDidMount() {
    fetch(`/places/img/${this.props.photoReference}`)
      .then( res => res.json())
      .then(url => this.setState({ url }))
  }

  render() {
    console.log(this.state.url)
    return (
      this.state.url ? <img src={this.state.url} /> : null
    )
  }
}
