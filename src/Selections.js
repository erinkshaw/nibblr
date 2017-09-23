import React, { Component } from 'react'
import Restaurant from './Restaurant'


class Selections extends Component {

  render() {
    const { selections } = this.props

    console.log(selections)
    return (
      <div>
        {/* <div className="trademark">
        Your Yummy Bites!
        </div> */}
        {selections.map((place) => <Restaurant place={place}/>)}
      </div>
    );
  }
}

export default Selections;
