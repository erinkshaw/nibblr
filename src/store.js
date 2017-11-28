import {createStore, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import axios from 'axios'

const defaultState = {
  places: {},
  img: ''
}

const GET_PLACES = 'GET_PLACES'

const REMOVE_PLACE = 'REMOVE_PLACE'

const GET_IMAGE = 'GET_IMAGE'

export const getPlacesData = (places) =>{
  return { type: GET_PLACES, places }
}

export const removePlace = () =>{
  return { type: REMOVE_PLACE }
}

export const getImage = () =>{
  return { type: GET_IMAGE }
}

export const gettingPlacesData = (lat, lng) =>{
  lat = lat || '40.6845305'
  lng = lng || '-73.9412525'
  return function thunk(dispatch) {
    axios.get(`/places/lat/${lat}/lng/${lng}`)
    .then(res =>  {
      return res.data
    })
    .then((data)=>{
      dispatch(getPlacesData(data))
    })
    .catch(console.error)
  }
}

export const gettingImage = (photoReference) =>{
  console.log('hey im in the thunk')
  return function thunk(dispatch) {
    console.log('hey im in the return thunky')
    axios.get(`/places/img/${photoReference}`)
    .then(res =>  {
      return res.data
    })
    .then((data)=>{
      dispatch(getImage(data))
    })
    .catch(console.error)
  }
}

const reducer = (state=defaultState, action) =>{
  switch(action.type) {
    case GET_PLACES : {
      return Object.assign({}, state, {places: action.places})
    }
    // case GET_IMAGE : {
    //   return Object.assign({}, state, {img: action.img})
    // }
    default: return state
  }
}

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk, createLogger({ collapsed: true }))))
