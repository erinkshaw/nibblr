import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Stack from './Stack'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCards: false
    }
  }

  render() {
    return (
      <div className='container'>
        <img src="/img/salad.svg"
          className="shiver"
          id="getCards"
          onClick={() => this.setState({ showCards: true })} />
        <div className="plate">
          <img src="/img/cutlery.svg" />
          <Stack showCards={this.state.showCards} />
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
