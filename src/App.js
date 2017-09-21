import React, { Component } from 'react'
import './App.css'
import Stack from './Card'
import Cards, { Card } from 'react-swipe-card'

class App extends Component {
  render() {
    return (
      <div>
        <div className="plate">
        <Stack />
        </div>
        <button type="button" className="btn btn-secondary btn-lg btn-outline-warning">See Your Food!</button>
      </div>
    );
  }
}

export default App;
