import React, { Component } from 'react'
import Restaurant from './Restaurant'


class Selections extends Component {

  render() {
    const { selections } = this.props

    console.log(this.props)
    return (
      <div>
        HIIII IT WORKED OMG
        {selections.map((food) => <Restaurant url={food}/>)}
      </div>
    );
  }
}

export default Selections;
