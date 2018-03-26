import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeSelection } from './store'
import Map from './Map'
import Avatar from 'material-ui/Avatar'
import { ListItem } from 'material-ui/List'
import { Modal, Image } from 'react-bootstrap'

class Restaurant extends Component {
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
    const { place, photoReference, removingSelection } = this.props
    const { showModal, url, placesDetails } = this.state
    const Deselect = <button type="button" className="close" aria-label="Close" onClick={() => removingSelection(photoReference)} >
    <span aria-hidden="true">&times;</span>
    </button>
    if (url) {
      return (
        <div>
            <ListItem
              leftAvatar={<Avatar src={url} />}
              primaryText={`${place.name}`}
              secondaryText={<p>{`${this.generateRandomMessage(place)}`}</p>}
              secondaryTextLines={2}
              onClick={this.handleShow}
              rightIconButton={Deselect}
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
                  {placesDetails.opening_hours.weekday_text.map(
                    day => <p key={day}>{day}</p>
                  )}
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

const mapDispatchToProps = (dispatch) => ({
  removingSelection(photoReference) {
    dispatch(removeSelection(photoReference))
  }
})

export default connect(null, mapDispatchToProps)(Restaurant)
