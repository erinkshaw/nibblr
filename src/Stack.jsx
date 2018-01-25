import React, { Component } from 'react'
import Cards, { Card } from 'react-swipe-card'
import Image from './Image'
import { connect } from 'react-redux'
import { addSelection, removePlacePhoto } from './store'


function Stack (props) {
    const { newSelection, removePhoto, showCards, foodImages } = props
    if (showCards) {
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
    return (<div className="master-root" id="load"><img src="/img/pizza.svg" /></div>)
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
    <img alt="reject pet icon" src="/img/tomato.svg" className="icon" />
  </span>)
const CustomAlertRight = () => (
  <span>
    <img alt="accept pet icon" src="/img/broccoli.svg" className="icon" />
  </span>)
