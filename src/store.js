import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import axios from 'axios'

const defaultState = {
  places: [],
  placesDetails: {}
}

const GET_PLACES = 'GET_PLACES'

const GET_MORE_PLACES = 'GET_MORE_PLACES'

const ADD_PLACE_DETAILS = 'ADD_PLACE_DETAILS'

export const addPlaceDetails = (place) => {
  return { type: ADD_PLACE_DETAILS, place }
}

export const getPlacesData = (places) => {
  return { type: GET_PLACES, places }
}

export const getMorePlacesData = (places) => {
  return { type: GET_MORE_PLACES, places }
}

export const gettingPlaceDetails = (placeId) => {
  const url = `/places/${placeId}`
  return function thunk(dispatch) {
    axios.get(url)
      .then(res => res.data)
      .then(data => {
        if (data.result.photos) dispatch(addPlaceDetails(data)
      )})
  }
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
        const places = data.results
        dispatch(getMorePlacesData(data))
        dispatch(gettingPlaceDetails(places[0].place_id))
        return Promise.all(places.map(place => dispatch(gettingPlaceDetails(place.place_id))))
      })
  }
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_PLACES: {
      return Object.assign({}, state, { places: action.places.results })
    }
    case GET_MORE_PLACES: {
      action.places.results = action.places.results.concat(state.places)
      return Object.assign({}, state, { places: action.places.results })
    }
    case ADD_PLACE_DETAILS: {
      const newPlacesDetails = state.placesDetails
      const placeDetails = action.place.result
      newPlacesDetails[placeDetails.place_id] = placeDetails.photos
      return Object.assign({}, state, { placesDetails: newPlacesDetails })
    }
    default: return state
  }
}

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk, createLogger({ collapsed: true }))))
