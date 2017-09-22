import React, {Component} from 'react'
import Cards, { Card } from 'react-swipe-card'

export default class Stack extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { actions, children, login, handleSwipe, data } = this.props

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
