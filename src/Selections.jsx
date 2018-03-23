import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Restaurant from './Restaurant'
import { connect } from 'react-redux'
import store from './store'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import { Modal, Button, Tooltip, Popover, OverlayTrigger } from 'react-bootstrap'

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
    this.setState({ showModal: false });
  }

  handleShow() {
    this.setState({ showModal: true });
  }

  render() {
    const { selections, places, placesMap } = this.props
    const { showModal } = this.state
    return (
      <div>
        <div className="container">
          <NavLink activeClassName="active" to={`/`} >
            <img src="/img/salad.svg"
              className="shiver"
              id="getCards" />
          </NavLink>
          <div id="chatbox">
            <List>
              <Subheader>{`Messages: ${selections.length}`}</Subheader>
              {!selections.length
                ? <ListItem
                  leftAvatar={<Avatar src={"/img/cutlery.svg"} />}
                  primaryText={`No matches :(`}
                  secondaryText={<p>{`Click the salad bowl and get swiping`}</p>}
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
        <Modal show={showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>yaaaaa</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
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


// //probably want to turn this into functional component
// class Selections extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       showModal: false
//     }
//     this.handleHide = this.handleHide.bind(this)
//   }
//   render() {
//     const { selections, places, placesMap } = this.props
//     const { showModal } = this.state
//     console.log(showModal)
//     return (
//       <div>
        // <div className="container">
        //   <NavLink activeClassName="active" to={`/`} >
        //     <img src="/img/salad.svg"
        //       className="shiver"
        //       id="getCards" />
        //   </NavLink>
        //   <div id="chatbox">
        //     <List>
        //       <Subheader>{`Messages: ${selections.length}`}</Subheader>
        //       {!selections.length
        //         ? <ListItem
        //           leftAvatar={<Avatar src={"/img/cutlery.svg"} />}
        //           primaryText={`No matches :(`}
        //           secondaryText={<p>{`Click the salad bowl and get swiping`}</p>}
        //           secondaryTextLines={2}
        //           onClick={() => this.setState({ showModal: true })}
        //         />
        //         :
        //         selections.map((image, i) => {
        //           const placeId = placesMap[image.photo_reference]
        //           const place = places.find(place => place.place_id === placeId)
        //           return <Restaurant key={i} place={place} photoReference={image.photo_reference} />
        //         })
        //       }
        //     </List>
        //   </div>
        // </div>
//         {showModal &&
//                 <Modal
//                 show={this.state.show}
//                 onHide={this.handleHide}
//                 container={this}
//                 aria-labelledby="contained-modal-title"
//               >
//                 <Modal.Header closeButton>
//                   <Modal.Title id="contained-modal-title">
//                     Contained Modal
//                   </Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                   Elit est explicabo ipsum eaque dolorem blanditiis doloribus sed id
//                   ipsam, beatae, rem fuga id earum? Inventore et facilis obcaecati.
//                 </Modal.Body>
//                 <Modal.Footer>
//                   <Button onClick={this.handleHide}>Close</Button>
//                 </Modal.Footer>
//               </Modal>}
//       </div>
//     )
//   }
//   handleHide() {
//     this.setState({ showModal: false });
//   }
// }


// const mapStateToProps = function (state) {
//   return {
//     places: state.places,
//     selections: state.selections,
//     placesMap: state.placesMap
//   }
// }

// export default connect(mapStateToProps)(Selections)
