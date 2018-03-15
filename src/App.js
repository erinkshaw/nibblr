import React, { Component } from 'react'
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom'
import Main from './Main'
import Selections from './Selections'
import store, { gettingPlacesData } from './store'
import toastr from 'toastr'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCards: false
    }
    this.removePizza = this.removePizza.bind(this)
    this.startNotifications = this.startNotifications.bind(this)
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition((position) => {store.dispatch(gettingPlacesData(position.coords.latitude, position.coords.longitude)) })
  }

  render() {
    setTimeout(this.startNotifications, 1000)
    const { showCards } = this.state
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/selections" render = {() => <Selections  />} />
            <Route path="/" render = {() => <Main showCards={showCards} removePizza={this.removePizza}/>} />
          </Switch>
        </div>
      </Router>
    )
  }
  removePizza() { this.setState({showCards: true}) }

  startNotifications() {
      function Toast(type, css, msg) {
          this.type = type
          this.css = css
          this.msg = msg
      }

      toastr.options.positionClass = 'toast-top-full-width'
      toastr.options.extendedTimeOut = 0
      toastr.options.timeOut = 1000
      toastr.options.fadeOut = 250
      toastr.options.fadeIn = 250

      var toasts = [
        new Toast('info', 'toast-top-full-width', `Welcome to Nibblr! I\'m "Tinder for Takeout"
        wiple left on something yucky :(
        Swipe right on something yummy ;)`),
        new Toast('warning', 'toast-top-left', 'Click on the salad bowl to reveal your choices!'),
        new Toast('success', 'toast-top-right', 'Click on the grocery bag to see your matches!'),
    ]


      var i = 0

      function delayToasts() {
          if (i === toasts.length) { return }
          var delay = i === 0 ? 0 : 2100
          setTimeout(function () { showToast() }, delay)
      }

      function showToast() {
          var t = toasts[i]
          toastr.options.positionClass = t.css
          toastr[t.type](t.msg)
          i++
          delayToasts()
      }
      return showToast()
  }
}

export default App
