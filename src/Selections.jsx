import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Restaurant from './Restaurant'
import { connect } from 'react-redux'
import store from './store'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'


class Selections extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ showModal: false })
  }

  handleShow() {
    this.setState({ showModal: true })
  }

  render() {
    const { selections, places, placesMap } = this.props
    const { showModal } = this.state
    return (
      <div>
        <a href={`https://github.com/erinkshaw/nibblr`} >
          <img src="/img/salad.svg"
            className="shiver"
            id="getCards" />
        </a>
      <NavLink activeClassName="active" to={`/`} >
          <img src="/img/groceries.svg"
            className="shiver"
            id="selections" />
        </NavLink>
        <div className="container">
          <div id="chatbox">
            <List>
              <Subheader>{`Messages: ${selections.length}`}</Subheader>
              {!selections.length
                ? <ListItem
                  leftAvatar={<Avatar src={"/img/cutlery.svg"} />}
                  primaryText={`No matches :(`}
                  secondaryText={<p>{`Click the salad bowl to go back and get swiping`}</p>}
                  secondaryTextLines={2}
                  onClick={this.handleShow}
                />
                :
                selections.map((image, i) => {
                  const placeId = placesMap[image.photo_reference]
                  const place = places.find(place => place.place_id === placeId)
                  return <Restaurant key={i} place={place} photoReference={image.photo_reference} />
                })
              }
            </List>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    places: state.places,
    selections: state.selections,
    placesMap: state.placesMap
  }
}

export default connect(mapStateToProps)(Selections)
