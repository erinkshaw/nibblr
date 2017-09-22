import React, { Component } from 'react'
import './App.css'
import Stack from './Card'
import Cards, { Card } from 'react-swipe-card'
import Navbar from './Navbar'
import Selections from './Selections'
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom'

class App extends Component {
  constructor() {
    super()
    this.state = {
      selections: []
    }
    this.handleSwipe = this.handleSwipe.bind(this)
  }

  handleSwipe (food) {
    this.setState({selections: [...this.state.selections, food] })
  }

  render() {
    console.log(this.state)
    return (
      <Router>
        <Switch>
          <Route path="/selections" render = {() => <Selections selections={this.state.selections} />} />
          <div>
            <Navbar selections={this.state.selections} />
            <div className="plate">
              <Stack handleSwipe={this.handleSwipe} />
            </div>
          </div>
        </Switch>
      </Router>
    );
  }
}

export default App;
