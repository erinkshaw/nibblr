import {createStore, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import axios from 'axios'

const defaultState = {
  places: {}
}

const GET_PLACES = 'GET_PLACES'

const REMOVE_PLACE = 'REMOVE_PLACE'


export const getPlacesData = (places) =>{
  return { type: GET_PLACES, places }
}

export const removePlace = () =>{
  return { type: REMOVE_PLACE }
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


const reducer = (state=defaultState, action) =>{
  switch(action.type) {
    case GET_PLACES : {
      return Object.assign({}, state, {places: action.places})
    }
    default: return state
  }
}

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk, createLogger({ collapsed: true }))))
