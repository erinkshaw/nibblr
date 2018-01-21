import React, { Component } from 'react'
import Cards, { Card } from 'react-swipe-card'
import Image from './Image'
import { connect } from 'react-redux'
import { addSelection, removePlacePhoto } from './store'


class Stack extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCards: false
    }
    this.shuffle.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.foodImages.length) this.setState({ showCards: true })
  }

  render() {
    const { newSelection, removePhoto } = this.props
    let foodImages = this.shuffle(this.props.foodImages)
    if (this.state.showCards) {
      return (
        <Cards
          alertRight={<CustomAlertRight />}
          alertLeft={<CustomAlertLeft />}
          onEnd={() => { console.log('you\'ve run out!') }
          } className='master-root'>
          {foodImages && foodImages.map((image, i) => (
            <Card key={i}
              onSwipeLeft={() => {
                removePhoto(image.photo_reference)
              }
              }
              onSwipeRight={() => {
                newSelection(image)
              }
              }>
              <Image photoReference={image.photo_reference} />
            </Card>
          )
          )}
        </Cards>
      )
    }
      return (<div></div>)
  }

  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }
    return array
  }
}

const mapStateToProps = (state) => ({
  places: state.places,
  foodImages: state.foodImages
})

const mapDispatchToProps = (dispatch) => ({
  newSelection(photo) {
    dispatch(addSelection(photo))
    dispatch(removePlacePhoto(photo.photo_reference))
  },
  removePhoto(id) {
    dispatch(removePlacePhoto(id))
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(Stack);

const CustomAlertLeft = () => (
  <span>
    <img alt="reject pet icon" src="/tomato.svg" className="icon" />
  </span>)
const CustomAlertRight = () => (
  <span>
    <img alt="accept pet icon" src="/broccoli.svg" className="icon" />
  </span>)
