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
    if (nextProps.placesDetails) this.setState({ showCards: true })
  }

  // componentWillUnmount() {
  //   this.unsubscribe()
  // }


  render() {
    console.log(this.state, 'stateee')

    const { placesDetails, handleSwipe } = this.props
    let places = this.props.places
    if (places) places = places.filter((restaurant) => restaurant.photos)

    if (this.state.showCards) {
      return (
        <Cards onEnd={() => { console.log('you\'ve run out!') }
        } className='master-root'>
          {placesDetails && places.map((place, i) => {
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
    return (<div>nope!</div>)
  }
}

const mapStateToProps = function (state) {
  return {
    places: state.places,
    placesDetails: state.placesDetails
  }
}

export default connect(mapStateToProps)(Stack);

