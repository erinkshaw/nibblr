import React, { Component } from 'react'
import Stack from './Card'
import Cards, { Card } from 'react-swipe-card'
import Navbar from './Navbar'
import Selections from './Selections'
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom'
import store, { gettingPlacesData } from './store'

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
