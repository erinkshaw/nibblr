import React, {Component} from 'react'
import Cards, { Card } from 'react-swipe-card'
import store from './store'

export default class Stack extends Component {
  constructor (props) {
    super(props);
    this.state = store.getState() || [];
  }

  componentDidMount () {
    console.log('hii mounted in card')
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  makeGooglePlacesPhotoURL (photoReference, key) {
    var baseURL = 'https://maps.googleapis.com/maps/api/place/photo?';
    var maxHeight = 400;
    var fullURL = baseURL + 'key=' + key + '&' + 'maxheight=' + maxHeight + '&' + 'photoreference=' + photoReference;
    return fullURL;
  }

  render() {
    const { actions, children, login, handleSwipe, data } = this.props
    console.log('hi this dot state', this.state.places.results)
    return (
      <div  >
        <Cards onEnd={() => console.log('end')} className='master-root'>
            {data.map((item, i) =>
              <Card key={i}
                onSwipeLeft={() => {
                  console.log('swipe left')
                  handleSwipe(item, 'left')}
                  }
                onSwipeRight={() => {
                  console.log('swipe right')
                  handleSwipe(item, 'right')
                  console.log(data)
                }
              }>
                <img src={item} className="stock"/>
              </Card>
            )}
          </Cards>
      </div>
    )
  }
}
