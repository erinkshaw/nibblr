import React, { Component } from 'react'
import { ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors'


export default class Restaurant extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: '',
      showModal: false
    }
    this.generateRandomMessage = this.generateRandomMessage.bind(this)
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    fetch(`/api/places/img/${this.props.photoReference}`)
      .then(res => res.json())
      .then(url => this.setState({ url }))
  }

  render() {
    console.log(this.props.place)
    const { place } = this.props
    const { showModal, url } = this.state
    if (url) {
      return (
        <div>
            <ListItem
              leftAvatar={<Avatar src={url} />}
              primaryText={`${place.name}`}
              secondaryText={<p>{`${this.generateRandomMessage(place)}`}</p>}
              secondaryTextLines={2}
            />
            <Modal show={showModal} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>yaaaaa</p>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleClose}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>
      )
    }
    return (<div></div>)
  }
  generateRandomMessage(place) {
    const greetings = ['Hey!', 'Howdy!', 'Ciao,', 'How are you?', 'How are you doing?!', 'Sup?']
    const myGreeting = greetings[Math.floor(Math.random()* greetings.length)]
    const isOpen = place.opening_hours.open_now ? 'I\'m open right now!' : 'sadly I\'m closed, but come visit me soon!'
    const message = `${myGreeting} My name is ${place.name}! People think I'm a ${place.rating} out of 5, and ${isOpen}`
    return message
  }
  handleClose() {
    this.setState({ showModal: false })
  }
  handleShow() {
    this.setState({ showModal: true })
  }
}

