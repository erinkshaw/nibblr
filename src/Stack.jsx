import React, { Component } from 'react'
import Cards, { Card } from 'react-swipe-card'
import Image from './Image'
import { connect } from 'react-redux'
import { addSelection, removePlacePhoto, getCurrentImages, removeCurrentImage } from './store'


// TODO: Return to functional component
function Stack(props) {
  const { newSelection, removePhoto, getMoreImages, currImages } = props
  if (currImages && currImages.length) {
    if (currImages.length < 3) getMoreImages()
    return (
      <Cards
        alertRight={<CustomAlertRight />}
        alertLeft={<CustomAlertLeft />}
        onEnd={() => getMoreImages()} className='master-root'>

        {currImages.map((image, i) => (
          <Card key={i}
            onSwipeLeft={ () => console.log(`removed ${image.photo_reference}`) }
            onSwipeRight={ () => newSelection(image) } >
            <Image photoReference={image.photo_reference} />
          </Card>
        ))}
      </Cards>
    )
  }
  return (<div className="master-root" id="load"><img src="/img/pizza.svg" /></div>)
}

const mapStateToProps = (state) => ({ currImages: state.currImages })

const mapDispatchToProps = (dispatch) => ({
  newSelection(photo) {
    dispatch(addSelection(photo))
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
