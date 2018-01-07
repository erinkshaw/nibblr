import {createStore, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import axios from 'axios'

const defaultState = {
  places: {},
  plaecesDetails: {}
}

const GET_PLACES = 'GET_PLACES'

const GET_MORE_PLACES = 'GET_MORE_PLACES'

const REMOVE_PLACE = 'REMOVE_PLACE'


export const getPlacesData = (places) => {
  return { type: GET_PLACES, places }
}

export const getMorePlacesData = (places) => {
  return { type: GET_MORE_PLACES, places }
}

export const removePlace = () =>{
  return { type: REMOVE_PLACE }
}

export const gettingPlacesData = (lat, lng) => {
  let url = `/places/lat/${lat}/lng/${lng}`
  let places
  lat = lat || '40.6845305'
  lng = lng || '-73.9412525'
  return function thunk(dispatch) {
    axios.get(url)
    .then(res => res.data)
    .then(data => {
      let token = data.next_page_token
      dispatch(getPlacesData(data))
      url = `/places/lat/${lat}/lng/${lng}?token=${token}`
        return axios.get(url)
    })
    .then(res => {
      return res.data
    })
    .then(data => {
      let token = data.next_page_token
      dispatch(getMorePlacesData(data))
      url = `/places/lat/${lat}/lng/${lng}?token=${token}`
      return axios.get(url)
    })
    .then(res => {
      return res.data
    })
    .then(data => {
      dispatch(getMorePlacesData(data))
    })
    .catch(console.error)
  }
}

const reducer = (state=defaultState, action) =>{
  switch(action.type) {
    case GET_PLACES : {
      return Object.assign({}, state, {places: action.places})
    }
    case GET_MORE_PLACES : {
      action.places.results = action.places.results.concat(state.places.results)
      return Object.assign({}, state, {places: action.places})
    }
    default: return state
  }
}

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk, createLogger({ collapsed: true }))))
