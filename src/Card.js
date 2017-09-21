import React, {Component} from 'react'
import Cards, { Card } from 'react-swipe-card'

export default class Stack extends Component {

  render() {
    const { actions, children, login } = this.props

    const data = ['/img/nachos.jpg', '/img/soup.jpg', '/img/pizza.jpg', '/img/spaghetti.jpg']

    return (
      <div  >
        <Cards onEnd={() => console.log('end')} className='master-root'>
            {data.map((item, i) =>
              <Card key={i}
                onSwipeLeft={() => console.log('swipe left')}
                onSwipeRight={() => console.log('swipe right')}>
                <img src={item}/>
              </Card>
            )}
          </Cards>
      </div>
    )
  }
}
