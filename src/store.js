import {createStore, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import axios from 'axios'

const defaultState = {
  places: {},
  // images: {}
}

const GET_PLACES = 'GET_PLACES'
// const GET_IMAGES = 'GET_IMAGES'

export const getPlacesData = (places) =>{
  return { type: GET_PLACES, places }
}

// export const getImages = (images) => {
//   return {type: GET_IMAGES, images}
// }

export const gettingPlacesData = () =>{
  return function thunk(dispatch) {
    axios.get('/places')
    .then(res =>  {
      return res.data
    })
    .then((data)=>{
      dispatch(getPlacesData(data))
    })
    .catch(console.error)
  }
}

// export const gettingImages = (location, key) =>{
//   return function thunk(dispatch) {
//     axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=500&types=restaurant&key=${key}`)
//     .then(res =>  {
//       return res.data
//     })
//     .then((data)=>{
//       dispatch(getImages(data))
//     })
//   }
// }



const reducer = (state=defaultState, action) =>{
  switch(action.type) {
    case GET_PLACES : {
      return Object.assign({}, state, {places: action.places})
    }
    // case GET_IMAGES: {
    //   return Object.assign({}, state, {images: [...images, action.images]})
    // }
    default: return state
  }
}

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk, createLogger({ collapsed: true }))))
