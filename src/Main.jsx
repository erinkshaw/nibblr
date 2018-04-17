import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Stack from './Stack'

function Main(props) {
  return (
    <div>
      <div className="plate">
        <div className="container-logo">
          <span id="logo">Nibblr
          </span>
        </div>
          <Stack />
      </div>
    <div>
      <a href={`https://github.com/erinkshaw/nibblr`} >
        <img src="/img/salad.svg"
          className="shiver"
          id="getCards" />
      </a>
      <img src="/img/groceries.svg"
        className="shiver"
        id="selections"
        onClick={() => props.history.push('/selections')} />
    </div>
    </div>
  )
}

export default withRouter(Main)
