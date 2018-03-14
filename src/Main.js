import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import notification from 'toastr'
import Stack from './Stack'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      leftToastr: false,
      rightToastr: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ leftToastr: true })
      setTimeout(() => { this.setState({ rightToastr: true }) })
    }, 1000)
  }


  render() {
    const { leftToastr, rightToastr } = this.state
    const { removePizza, showCards } = this.props
    console.log(showCards)
    notification.options.positionClass = "toast-top-right"
    return (
      <div className='container'>
        <img src="/img/salad.svg"
          className="shiver"
          id="getCards"
          onClick={() => {
            notification.success('Item added to cart!')
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
