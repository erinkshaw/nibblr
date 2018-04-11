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
      showCards: false,
      showToast: true,
      currentHref: window.location.href.split('/')
    }
    this.removePizza = this.removePizza.bind(this)
    this.startNotifications = this.startNotifications.bind(this)
  }

  componentDidMount() {
    console.log('Component did mount', Date())
    if (this.state.showToast && !this.state.currentHref[this.state.currentHref.length-1]) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(`Got position ${position}`, Date())
        store.dispatch(gettingPlacesData(position.coords.latitude, position.coords.longitude))
      }, (error) => {
        store.dispatch(gettingPlacesData('40.6845305', '-73.9412525'))
        console.log('geolocation.getCurrentPosition returned an error:', error)
      }, {
        maximumAge: 5 * 60 * 1000,
        timeout:    5000
      })
    }
  }

  render() {
    const { showCards, showToast, currentHref } = this.state

    // if this is a new page load && the current href is main
    if (showToast && !currentHref[currentHref.length-1]) {
      setTimeout(this.startNotifications, 1000)
    }

    return (
      <Router>
        <div>
          <Switch>
            <Route path="/selections" render={() => <Selections />} />
            <Route path="/" render={() => <Main showCards={showCards} removePizza={this.removePizza} />} />
          </Switch>
        </div>
      </Router>
    )
  }

  removePizza() { this.setState({ showCards: true }) }

  startNotifications() {
    this.setState({ showToast: false })
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
      new Toast('info', 'toast-top-full-width', `Welcome to Nibblr! I\'m "Tinder for Takeout" `),
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
