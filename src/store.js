import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import axios from 'axios'

const defaultState = {
  places: [],
  foodImages: [],
  selections: []
}

const GET_PLACES = 'GET_PLACES'

const GET_MORE_PLACES = 'GET_MORE_PLACES'

const ADD_PLACE_DETAILS = 'ADD_PLACE_DETAILS'

const ADD_PLACE_PHOTOS = 'ADD_PLACE_PHOTOS'

const REMOVE_PLACE_PHOTO = 'REMOVE_PLACE_PHOTO'

const ADD_SELECTION = 'ADD_SELECTION'

export const addPlaceDetails = (place) => {
  return { type: ADD_PLACE_DETAILS, place }
}

export const getPlacesData = (places) => {
  return { type: GET_PLACES, places }
}

export const getMorePlacesData = (places) => {
  return { type: GET_MORE_PLACES, places }
}

export const addPlacePhotos = (placePhotos) => {
  return { type: ADD_PLACE_PHOTOS, placePhotos }
}

export const gettingPlaceDetails = (placeId) => {
  const url = `/places/${placeId}`
  return function thunk(dispatch) {
    axios.get(url)
      .then(res => res.data)
      .then(data => {
        if (data.result.photos) {
          dispatch(gettingFoodImages(makeJSON(data.result.photos, data.result.place_id)))
        }
      })
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

const isFood = image => image.name === 'food'

export const gettingFoodImages = (photoJson) => {
  const url = `/clarifai/predict/${photoJson}`
  return function thunk(dispatch) {
    axios.get(url)
      .then(res => res.data)
      .then(data => {
        const foodImages = data.filter(photo => photo.data.concepts.find(isFood))
        if (foodImages.length) dispatch(addPlacePhotos(foodImages))
      })
  }
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_PLACES: {
      return { ...state, places: action.places.results }
    }
    case GET_MORE_PLACES: {
      return { ...state, places: action.places.results.concat(state.places) }
    }
    case ADD_PLACE_PHOTOS: {
      return { ...state, foodImages: [...state.foodImages, ...action.placePhotos] }
    }
    case REMOVE_PLACE_PHOTO: {
      return { ...state, foodImages: [...state.foodImages, ...action.placePhotos] }
    }
    case ADD_SELECTION: {
      return { ...state, foodImages: [...state.foodImages, ...action.placePhotos] }
    }
    default: return state
  }
}

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk, createLogger({ collapsed: true }))))


const makeJSON = (arr, placeId) => {
  let jsonify = []
  arr.forEach(photo => jsonify.push({ url: photo.photo_reference }))
  return JSON.stringify(jsonify)
}

const toPhotoReference = (photoUrl) => {
  return photoUrl.split('photoreference=')[1]
}
