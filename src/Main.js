import React, { Component } from 'react'
import Stack from './Stack'
import Navbar from './Navbar'


export default function (props) {

  return (
    <div>
      <div className='container'>
        <img src="/lemon.svg" id="aboutMe" />
        <img src="/salad.svg" id="getCards" />
        <img src="/groceries.svg" id="selections" />
      </div>
      <div className="plate">
        <img src="/cutlery.svg" />
        <Stack handleSwipe={props.handleSwipe} />
      </div>
    </div>
  )
}
