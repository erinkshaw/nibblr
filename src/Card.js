import React, {Component} from 'react'
import Cards, { Card } from 'react-swipe-card'
import Image from './Image'
import Place from './Place'
import store from './store'

export default class Stack extends Component {
  constructor (props) {
    super(props)
    this.state = store.getState() || [];
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
  }

  componentWillUnmount () {
    this.unsubscribe()
  }


  render() {
    const { actions, children, login, handleSwipe, data } = this.props
    let places = this.state.places.results
    if (places) places = places.filter((restaurant) => restaurant.photos)
    return (
      <div  >
        <Cards onEnd={() => {console.log('you\'ve run out!')}
          } className='master-root'>
            {places && places.map((place, i) =>
              {
                return (
                    <Card key={i}
                      onSwipeLeft={() => {
                        console.log('swipe left')
                        handleSwipe(item, 'left')
                      }
                      }
                      onSwipeRight={() => {
                        console.log('swipe right')
                        handleSwipe(item, 'right')
                      }
                      }>
                      <Image photoReference={place.photos[0].photo_reference} />
                    </Card>
                )
              }
            )}
          </Cards>
      </div>
    )
  }
}
