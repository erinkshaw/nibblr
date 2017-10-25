import React, {Component} from 'react'
import Cards, { Card } from 'react-swipe-card'
import store from './store'

export default class Stack extends Component {
  constructor (props) {
    super(props);
    this.state = store.getState() || [];
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount () {
    this.unsubscribe();
  }


  render() {
    function makeGooglePlacesPhotoURL (photoReference, key) {
      var baseURL = 'https://maps.googleapis.com/maps/api/place/photo?';
      var maxHeight = 4000;
      var fullURL = baseURL + 'key=' + key + '&' + 'maxheight=' + maxHeight + '&' + 'photoreference=' + photoReference;
      return fullURL;
    }
    const { actions, children, login, handleSwipe, data } = this.props
    const places = this.state.places.results

    return (
      <div  >
        <Cards onEnd={() => {console.log('you\'ve run out!')}
          } className='master-root'>
            {places && places.map((item, i) =>
              {
                const url = makeGooglePlacesPhotoURL(places[i].photos[0].photo_reference, 'AIzaSyBv6nWAWnIZgBvtLWsCCSbSjL5DvVhPKEo')
                return (<Card key={i}
                  onSwipeLeft={() => {
                    console.log('swipe left')
                    handleSwipe(item, 'left')}
                    }
                  onSwipeRight={() => {
                    console.log('swipe right')
                    handleSwipe(item, 'right')
                  }
                }>
                <img src={url} className="stock"/>
              </Card>)}
            )}
          </Cards>
      </div>
    )
  }
}
