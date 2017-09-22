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
      selections: [],
      data: ['/img/nachos.jpg', '/img/soup.jpg', '/img/pizza.jpg', '/img/spaghetti.jpg']
    }
    this.handleSwipe = this.handleSwipe.bind(this)
  }

  handleSwipe (food, direction) {
    if (direction === 'right') {
      this.setState({selections: [...this.state.selections, food] })
      // this.setState({data: this.state.data.slice(1)})
    }
    // else {
    //   this.setState({data: this.state.data.slice(1)})
    // }
  }

  render() {

    console.log(this.state)
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route path="/selections" render = {() => <Selections selections={this.state.selections} />} />
            <div className="plate">
              <Stack handleSwipe={this.handleSwipe} data={this.state.data} />
            </div>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
