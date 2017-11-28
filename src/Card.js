import React, {Component} from 'react'
import Cards, { Card } from 'react-swipe-card'
import Image from './Image'
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
    function makeGooglePlacesPhotoURL (photoReference) {
      var baseURL = 'https://maps.googleapis.com/maps/api/place/photo?';
      var maxHeight = 4000;
      var key = 'AIzaSyCHj-XDr1thAGIPW9AfZNpAfE1_pcr0H0M'
      var fullURL = baseURL + 'key=' + key + '&' + 'maxheight=' + maxHeight + '&' + 'photoreference=' + photoReference;
      return fullURL;
    }
    const { actions, children, login, handleSwipe, data } = this.props
    let places = this.state.places.results
    if (places) places = places.filter((restaurant) => restaurant.photos)
    if (places) console.log(places)
    return (
      <div  >
        <Cards onEnd={() => {console.log('you\'ve run out!')}
          } className='master-root'>
            {places && places.map((item, i) =>
              {
                // const url =  makeGooglePlacesPhotoURL(places[i].photos[0].photo_reference)
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
                      <Image photoReference={places[i].photos[0].photo_reference} />
                    </Card>
                )
              }
            )}
          </Cards>
      </div>
    )
  }
}
