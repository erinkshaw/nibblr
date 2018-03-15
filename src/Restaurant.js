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
    this.generateRandomMessage = this.generateRandomMessage.bind(this)
  }

  componentDidMount() {
    fetch(`/api/places/img/${this.props.photoReference}`)
      .then(res => res.json())
      .then(url => this.setState({ url }))
  }

  render() {
    console.log(this.props.place)
    const { place } = this.props
    if (this.state.url) {
      return (
            <ListItem
              leftAvatar={<Avatar src={this.state.url} />}
              primaryText={`${this.props.place.name}`}
              secondaryText={
                <p>{`${this.generateRandomMessage(place)}`}</p>
              }
              secondaryTextLines={2}
            />
      )
    }
    return (<div></div>)
  }
  generateRandomMessage(place) {
    const greetings = ['Hey!', 'Howdy!', 'Ciao,', 'How are you?', 'How are you doing?!', 'Sup?']
    // const closings = ['I taste mighty good']
    const myGreeting = greetings[Math.floor(Math.random()* greetings.length)]
    const isOpen = place.opening_hours.open_now ? 'I\'m open right now!' : 'sadly I\'m closed, but come visit me soon!'
    const message = `${myGreeting} My name is ${place.name}! People think I'm a ${place.rating} out of 5, and ${isOpen}`
    return message
  }
}

