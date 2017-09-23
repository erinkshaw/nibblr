import React, { Component } from 'react'
import Restaurant from './Restaurant'
import NavHome from './NavHome'


class Selections extends Component {

  render() {
    const { selections } = this.props

    console.log(selections)
    return (
      <div>
        <NavHome />
        {/* <div className="trademark">
        Your Yummy Bites!
        </div> */}
        {selections.map((place) => <Restaurant key={place.id} place={place}/>)}
      </div>
    );
  }
}

export default Selections;
