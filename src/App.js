import React, { Component } from 'react'
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom'
import Main from './Main'
import Selections from './Selections'
import store, { gettingPlacesData } from './store'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCards: false
    }
    this.removePizza = this.removePizza.bind(this)
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition((position) => {store.dispatch(gettingPlacesData(position.coords.latitude, position.coords.longitude)) })
  }

  render() {
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
    );
  }
  removePizza() { this.setState({showCards: true}) }
}

export default App;
