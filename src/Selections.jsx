import React, { Component } from 'react'
import Restaurant from './Restaurant'
import NavHome from './NavHome'


class Selections extends Component {

  render() {
    const { selections } = this.props
    return (
      <div className="padBottom">
        <NavHome />
        {!selections.length ? <h1 className="middle">You haven't swiped anything yet!</h1> :
        selections.map((place) => <Restaurant key={place.id} place={place}/>)}
      </div>
    );
  }
}

export default Selections;
