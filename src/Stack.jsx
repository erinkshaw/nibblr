import React, { Component } from 'react'
import Cards, { Card } from 'react-swipe-card'
import Image from './Image'
import { connect } from 'react-redux'
import store from './store'

class Stack extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCards: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.foodImages.length) this.setState({ showCards: true })
  }


  render() {

    const { foodImages, handleSwipe } = this.props
    let places = this.props.places
    if (places) places = places.filter((restaurant) => restaurant.photos)

    if (this.state.showCards) {
      return (
        <Cards onEnd={() => { console.log('you\'ve run out!') }
        } className='master-root'>
          {foodImages && foodImages.map((image, i) => {
            return (
              <Card key={i}
                onSwipeLeft={() => {
                  console.log('swipe left')
                  handleSwipe(image, 'left')
                }
                }
                onSwipeRight={() => {
                  console.log('swipe right')
                  handleSwipe(image, 'right')
                }
                }>
                <Image photoReference={image.photo_reference} />
              </Card>
            )
          }
          )}
        </Cards>
      )
    }
    return (<div>nope!</div>)
  }
}

const mapStateToProps = function (state) {
  return {
    places: state.places,
    foodImages: state.foodImages
  }
}

export default connect(mapStateToProps)(Stack);

