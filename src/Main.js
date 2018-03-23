import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Stack from './Stack'

function Main(props) {
    const { removePizza, showCards } = props
  return (
    <div>
      <div className="plate">
        <div className="container-logo">
          <span id="logo">Nibblr
          </span>
          <Stack showCards={showCards} />
        </div>
        {/* <img src="/img/cutlery.svg" /> */}
      </div>
    <div>
      <img src="/img/salad.svg"
        className="shiver"
        id="getCards"
        onClick={() => removePizza()} />
      <img src="/img/groceries.svg"
        className="shiver"
        id="selections"
        onClick={() => props.history.push('/selections')} />
    </div>
    </div>
  )
}

export default withRouter(Main)
