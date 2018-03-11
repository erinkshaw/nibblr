import React, { Component } from 'react'
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';


export default class Restaurant extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: ''
    }
  }

  componentDidMount() {
    fetch(`/api/places/img/${this.props.photoReference}`)
      .then(res => res.json())
      .then(url => this.setState({ url }))
  }

  render() {
    console.log(this.props.place)
    if (this.state.url) {
      return (
            <ListItem
              leftAvatar={<Avatar src={this.state.url} />}
              primaryText={`${this.props.place.name}`}
              secondaryText={
                <p>
                  <span style={{ color: darkBlack }}>{`${this.props.place.name}`}</span> --
              I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
            </p>
              }
              secondaryTextLines={2}
            />
      )
    }
    return (<div></div>)
  }
}

