import React, { Component } from 'react'
import Cards, { Card } from 'react-swipe-card'
import Image from './Image'
import { connect } from 'react-redux'
import store from './store'
import Tinderable from 'react-tinderable'
class Stack extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCards: false
    }
    this.shuffle.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.foodImages.length) this.setState({ showCards: true })
  }

  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }



  render() {

    const { handleSwipe } = this.props
    let foodImages = this.shuffle(this.props.foodImages)
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
                {/* <Image photoReference={image.photo_reference} />
              */}
              <img src={image.input.data.image.url} />
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

