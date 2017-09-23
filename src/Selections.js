import React, { Component } from 'react'
import Restaurant from './Restaurant'
import NavHome from './NavHome'


class Selections extends Component {

  render() {
    const { selections } = this.props
    console.log(selections)
    return (
      <div className="padBottom">
        <NavHome />
        {/* <div className="trademark">
        Your Yummy Bites!
        </div> */}
        {!selections.length ? <h1 className="middle">You haven't swiped anything yet!</h1> :
        selections.map((place) => <Restaurant key={place.id} place={place}/>)}
      </div>
    );
  }
}

export default Selections;
