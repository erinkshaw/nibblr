import React, { Component } from 'react'
import './App.css'
import Stack from './Card'
import Cards, { Card } from 'react-swipe-card'
import Navbar from './Navbar'
import Selections from './Selections'
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/selections" component={Selections} />
          <div>
            <Navbar />
            <div className="plate">
              <Stack />
            </div>
          </div>
        </Switch>
      </Router>
    );
  }
}

export default App;
