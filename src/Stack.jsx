import React, { Component } from 'react'
import Cards, { Card } from 'react-swipe-card'
import Image from './Image'
import { connect } from 'react-redux'
import store from './store'

class Stack extends Component {
  constructor(props) {
    super(props)
    // this.state = store.getState() || [];
  }

  // componentDidMount() {
  //   this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
  // }

  // componentWillUnmount() {
  //   this.unsubscribe()
  // }


  render() {
    const { placesDetails, handleSwipe } = this.props
    let places = this.props.places
    if (places) places = places.filter((restaurant) => restaurant.photos)
    return (
      <Cards onEnd={() => { console.log('you\'ve run out!') }
      } className='master-root'>
        {places && places.map((place, i) => {
          return (
            <Card key={i}
              onSwipeLeft={() => {
                console.log('swipe left')
                handleSwipe(place, 'left')
              }
              }
              onSwipeRight={() => {
                console.log('swipe right')
                handleSwipe(place, 'right')
              }
              }>
              <Image photoReference={place.photos[0].photo_reference} />
            </Card>
          )
        }
        )}
      </Cards>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    campuses: state.campuses
  }
}

export default connect(mapStateToProps)(Stack);

