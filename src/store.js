import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import axios from 'axios'

const defaultState = {
  places: [],
  placesMap: {},
  foodImages: [],
  currImages: [],
  selections: []
}

const GET_PLACES = 'GET_PLACES'

const GET_MORE_PLACES = 'GET_MORE_PLACES'

const ADD_PLACE_DETAILS = 'ADD_PLACE_DETAILS'

const ADD_PLACE_PHOTOS = 'ADD_PLACE_PHOTOS'

const GET_CURRENT_IMAGES = 'GET_CURRENT_IMAGES'

const REMOVE_CURRENT_IMAGE = 'REMOVE_CURRENT_IMAGE'

const REMOVE_PLACE_PHOTO = 'REMOVE_PLACE_PHOTO'

const ADD_SELECTION = 'ADD_SELECTION'

const REMOVE_SELECTION = 'REMOVE_SELECTION'

const ADD_PLACE_ASSOCIATION = 'ADD_PLACE_ASSOCIATION'

export const addPlaceDetails = (place) => {
  return { type: ADD_PLACE_DETAILS, place }
}

export const getPlacesData = (places) => {
  return { type: GET_PLACES, places }
}

export const addPlacePhotos = (placePhotos) => {
  return { type: ADD_PLACE_PHOTOS, placePhotos }
}

export const getCurrentImages = () => {
  return { type: GET_CURRENT_IMAGES }
}

export const removeCurrentImage = (photoId) => {
  return { type: REMOVE_CURRENT_IMAGE, photoId }
}

export const removePlacePhoto = (photoId) => {
  return { type: REMOVE_PLACE_PHOTO, photoId }
}

export const addSelection = (selection) => {
  return { type: ADD_SELECTION, selection }
}

export const removeSelection = (photoReference) => {
  return { type: REMOVE_SELECTION, photoReference }
}

export const addPlaceAssociation = (placesMap) => {
  return { type: ADD_PLACE_ASSOCIATION, placesMap }
}

export const gettingPlaceDetails = (placeId) => {
  const url = `/api/places/${placeId}`
  return function thunk(dispatch) {
    // if the first image request has completed, then serve the first images to our store
    if (store.getState().foodImages.length && !store.getState().currImages.length) {
      dispatch(getCurrentImages())
    }
    axios.get(url)
      .then(res => res.data)
      .then(data => {
        if (data.result.photos) {
          const clarifaiRequest = makeJSON(data.result.photos, data.result.place_id)
          dispatch(gettingFoodImages(clarifaiRequest.json))
          dispatch(addPlaceAssociation(clarifaiRequest.placesMap))
        }
      })
  }
}

function placesURL(lat, lng, token) {
  let url = `/api/places/lat/${lat}/lng/${lng}`
  if (token) {
    url += `?token=${token}`
  }
  return url
}

function gettingPlacesDataHelper(dispatch, lat, lng, more, token) {
  let url = placesURL(lat, lng, token)
  axios.get(url)
  .then(res => res.data)
  .then(data => {
    dispatch(getPlacesData(data))
    const places = data.results
    places.map(place => dispatch(gettingPlaceDetails(place.place_id)))
    if (more > 0) {
      gettingPlacesDataHelper(dispatch, lat, lng, more - 1, data.next_page_token)
    }
  })
}

export const gettingPlacesData = (lat, lng) => {
  return function thunk(dispatch) {
    gettingPlacesDataHelper(dispatch, lat, lng, 2, null)
  }
}

export const gettingFoodImages = (photoJson) => {
  const url = `/api/clarifai/predict/${photoJson}`
  return function thunk(dispatch) {
    axios.get(url)
      .then(res => res.data)
      .then(data => {
        data = data.map(photo => ({
          concepts: photo.data.concepts,
          photo_reference: toPhotoReference(photo.input.data.image.url)
        }))
        const foodImages = data.filter(photo => photo.concepts.find(isFood))
        if (foodImages.length) dispatch(addPlacePhotos(foodImages))
      })
  }
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_PLACES: {
      return { ...state, places: [...action.places.results, ...state.places] }
    }
    case ADD_PLACE_PHOTOS: {
      return { ...state, foodImages: [...state.foodImages, ...action.placePhotos].sort(shuffle) }
    }
    case REMOVE_PLACE_PHOTO: {
      return { ...state, foodImages: [...state.foodImages.filter(img => img.photo_reference !== action.photoId)] }
    }
    case GET_CURRENT_IMAGES: {
      return { ...state, currImages: [...state.currImages, ...state.foodImages.slice(0, 20)] }
    }
    case REMOVE_CURRENT_IMAGE: {
      return { ...state, currImages: [...state.currImages.filter(img => img.photo_reference !== action.photoId)] }
    }
    case ADD_SELECTION: {
      return { ...state, selections: [...state.selections, action.selection] }
    }
    case REMOVE_SELECTION: {
      return { ...state, selections: [...state.selections.filter(selection => selection.photo_reference != action.photoReference)] }
    }
    case ADD_PLACE_ASSOCIATION: {
      const newPlacesMap = action.placesMap
      return { ...state, placesMap: { ...state.placesMap, ...newPlacesMap } }
    }
    default: return state
  }
}

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk, createLogger({ collapsed: true }))))

export default store

const makeJSON = (arr, placeId) => {
  let jsonify = []
  const placesMap = {}
  arr.forEach(photo => {
    jsonify.push({ url: photo.photo_reference })
    placesMap[photo.photo_reference] = placeId
  })
  return ({ json: JSON.stringify(jsonify), placesMap })
}

const toPhotoReference = photoUrl => photoUrl.split('photoreference=')[1]

const isFood = image => (image.name === 'food' && image.value > .98)

const shuffle = () => .5 - Math.random()
