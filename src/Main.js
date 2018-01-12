import React, { Component } from 'react'
import Stack from './Stack'
import Navbar from './Navbar'


export default function(props) {

  return (
          <div>
            <Navbar />
            <div className="plate">
              <Stack handleSwipe={props.handleSwipe} />
            </div>
            {/* <div className="trademark">Tinder for Take Out</div> */}
          </div>
  )
}
