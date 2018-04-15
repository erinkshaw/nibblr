import React, { Component } from 'react'
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom'
import Main from './Main'
import Selections from './Selections'
import store, { gettingPlacesData, getCurrentImages } from './store'
import toastr from 'toastr'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showToast: true,
      currentHref: window.location.href.split('/')
    }
    this.startNotifications = this.startNotifications.bind(this)
  }

  componentDidMount() {
    // if this is the first time on main
    if (this.state.showToast && !this.state.currentHref[this.state.currentHref.length-1]) {
      // if this is the first time on the site (ever), so user coords are not saved on localStorage
      if (!localStorage.getItem('coords')) {
        navigator.geolocation.getCurrentPosition(position => {
          localStorage.setItem('coords', JSON.stringify({lat: position.coords.latitude, lng: position.coords.longitude}))
          store.dispatch(gettingPlacesData(position.coords.latitude, position.coords.longitude))
        }, (error) => {
          // if browser can't grab coords, serve static lat lng from fidi
          store.dispatch(gettingPlacesData('40.6845305', '-73.9412525'))
          console.log('geolocation.getCurrentPosition returned an error:', error, 'defaulting to fidi coords')
        }, {
          // give it 20 seconds to fetch current location, then default to err
          timeout: 20000,
          enableHighAccuracy: false,
        })
      } else {
        // otherwise user has visited before
        navigator.geolocation.getCurrentPosition(position => {
          // on success reset the coords stored in localStorage to newest coords
          localStorage.setItem('coords', JSON.stringify({lat: position.coords.latitude, lng: position.coords.longitude}))
          store.dispatch(gettingPlacesData(position.coords.latitude, position.coords.longitude))
        }, (error) => {
          // on error (most likely, timeout) serve lat lng on localStorage
          const { lat, lng } = JSON.parse(localStorage.getItem('coords'))
          store.dispatch(gettingPlacesData(lat, lng))
          console.log('geolocation.getCurrentPosition returned an error:', error, 'using coords from local storage')
        }, {
          timeout: 5000,
          enableHighAccuracy: false,
        })
      }
    }
  }

  render() {
    const { showToast, currentHref } = this.state

    // if this is a new page load && the current href is main
    if (showToast && !currentHref[currentHref.length-1]) {
      setTimeout(this.startNotifications, 1000)
    }

    return (
      <Router>
        <div>
          <Switch>
            <Route path="/selections" render={() => <Selections />} />
            <Route path="/" render={() => <Main />} />
          </Switch>
        </div>
      </Router>
    )
  }

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
      new Toast('warning', 'toast-top-left', 'Click on the salad bowl to learn more about me!'),
      new Toast('success', 'toast-top-right', 'Click on the grocery bag to toggle between matches and choices!'),
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
