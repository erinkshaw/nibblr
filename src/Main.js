import React, { Component } from 'react'
import Stack from './Stack'
import Navbar from './Navbar'


export default function (props) {

  return (
    <div className="container">
      {/* <Navbar /> */}
      <img src="/lemon.svg" id="aboutMe" />
      <div className="plate">
        <img src="/cutlery.svg" />
        {/* <Stack handleSwipe={props.handleSwipe} /> */}
      </div>
      <img src="/groceries.svg" id="selections" />
    </div>
  )
}
