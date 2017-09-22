import React, { Component } from 'react'


class Selections extends Component {

  render() {
    const { selections } = this.props

    console.log(this.props)
    return (
      <div>
        HIIII IT WORKED OMG THNKS
        {selections.map((food) => <img src={food}/>)}
      </div>
    );
  }
}

export default Selections;
