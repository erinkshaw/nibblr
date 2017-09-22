import React from 'react'


function Restaurant(props) {

    return (
      <div>
      { props ?
        <img src={props.url} />
        : null
      }
      </div>

    )
}

export default Restaurant
