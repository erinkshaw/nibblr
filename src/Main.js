import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Stack from './Stack'

class Main extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { removePizza, showCards } = this.props
    return (
      <div className='container'>
        <img src="/img/salad.svg"
          className="shiver"
          id="getCards"
          onClick={() => {
            removePizza()}} />
        <div className="plate">
          <div className="container">
            <span id="logo">Nibblr
            </span>
          </div>
          <img src="/img/cutlery.svg" />
          <Stack showCards={showCards} />
        </div>
        <img src="/img/groceries.svg"
          className="shiver"
          id="selections"
          onClick={() => this.props.history.push('/selections')} />
      </div>
    )
  }
}

export default withRouter(Main)
