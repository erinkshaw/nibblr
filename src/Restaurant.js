import React, { Component } from 'react'
import Map from './Map'
import { ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import { Modal, Image } from 'react-bootstrap'

export default class Restaurant extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: '',
      placesDetails: {},
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
    fetch(`/api/places/${this.props.place.place_id}`)
      .then(res => res.json())
      .then(placesDetails => this.setState({ placesDetails: placesDetails.result }))
  }

  render() {
    console.log(this.props.place)
    console.log('this dot state', this.state)
    const { place } = this.props
    const { showModal, url, placesDetails } = this.state
    if (url) {
      return (
        <div>
            <ListItem
              leftAvatar={<Avatar src={url} />}
              primaryText={`${place.name}`}
              secondaryText={<p>{`${this.generateRandomMessage(place)}`}</p>}
              secondaryTextLines={2}
              onClick={this.handleShow}
            />
            <Modal show={showModal} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{`${place.name}`}</Modal.Title>
                <p>{placesDetails.formatted_address && placesDetails.formatted_address}</p>
                <p>{placesDetails.formatted_phone_number && placesDetails.formatted_phone_number}</p>
                {placesDetails.website && <a href={placesDetails.website}>Website</a>}
              </Modal.Header>
              <Modal.Body>
              <Image src={url} rounded style={{ width: "100%" }} />
              {placesDetails.opening_hours.weekday_text &&
                <div>
                  <Modal.Title>Hours</Modal.Title>
                  <p>{placesDetails.opening_hours.weekday_text.map(
                    day => <p>{day}</p>
                  )}</p>
                </div>}
              </Modal.Body>
              <Modal.Footer>
                <Map placeId={place.place_id} />
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

