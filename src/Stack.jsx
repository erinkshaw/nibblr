import React, { Component } from 'react'
import Cards, { Card } from 'react-swipe-card'
import Image from './Image'
import { connect } from 'react-redux'
import { addSelection, removePlacePhoto, getCurrentImages, removeCurrentImage } from './store'


// TODO: Return to functional component
class Stack extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { newSelection, removePhoto, getCurrentImages, getMoreImages, showCards, foodImages, currImages } = this.props


    if (currImages && currImages.length) {
      const foods = currImages.map((image, i) => (
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
      ))

      console.log(currImages, foods)
      //console.log('curr images', currImages)
      return (
        <Cards
          alertRight={<CustomAlertRight />}
          alertLeft={<CustomAlertLeft />}
          onEnd={() => getMoreImages()} className='master-root'>

          {currImages.map((image, i) => (
            <Card key={i}
              onSwipeLeft={() =>
                removePhoto(image.photo_reference)

              }
              onSwipeRight={() =>
                newSelection(image)

              }>
              <Image photoReference={image.photo_reference} />
            </Card>
          ))}
        </Cards>
      )
    }
    return (<div className="master-root" id="load"><img src="/img/pizza.svg" /></div>)
  }
}

const mapStateToProps = (state) => ({
  places: state.places,
  foodImages: state.foodImages,
  currImages: state.currImages
})

const mapDispatchToProps = (dispatch) => ({
  newSelection(photo) {
    dispatch(addSelection(photo))
    dispatch(removePlacePhoto(photo.photo_reference))
    dispatch(removeCurrentImage(photo.photo_reference))
  },
  removePhoto(id) {
    dispatch(removePlacePhoto(id))
    dispatch(removeCurrentImage(id))
  },
  getMoreImages() {
    dispatch(getCurrentImages())
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(Stack)

const CustomAlertLeft = () => (
  <span>
    <img src="/img/tomato.svg" className="icon" />
  </span>)
const CustomAlertRight = () => (
  <span>
    <img src="/img/broccoli.svg" className="icon" />
  </span>)
