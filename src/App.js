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
      selections: [],
    }
    this.handleSwipe = this.handleSwipe.bind(this)
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition((position) => {store.dispatch(gettingPlacesData(position.coords.latitude, position.coords.longitude)) })
  }

  handleSwipe (food, direction) {
    if (direction === 'right') {
      this.setState({selections: [...this.state.selections, food] })
      // store.dispatch(removePlace())
      // this.setState({places: this.state.places.results.slice(1)})
    }
    // else {
    //   this.setState({places: this.state.places.results.slice(1)})

    // }
  }

  render() {
    console.log(this.state)
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/selections" render = {() => <Selections selections={this.state.selections} />} />
            <Route path="/" render = {() => <Main handleSwipe={this.handleSwipe} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
