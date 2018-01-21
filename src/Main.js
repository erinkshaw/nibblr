import React, { Component } from 'react'
import Stack from './Stack'
import Navbar from './Navbar'


export default function (props) {

  return (
      <div className='container'>
        <img src="/salad.svg" className="shiver" id="getCards" />
        <div className="plate">
          <img src="/cutlery.svg" />
          <Stack handleSwipe={props.handleSwipe} />
        </div>
        <img src="/groceries.svg" className="shiver" id="selections" />
      </div>
  )
}
