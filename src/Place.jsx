import React, {Component} from 'react'
import { Card } from 'react-swipe-card'
import Image from './Image'

export default function Place(props) {
  const { actions, children, login, handleSwipe, data, i, place } = props
  console.log(props)
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

