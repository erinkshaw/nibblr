import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import axios from 'axios'

const defaultState = {
  places: [],
  placesMap: {},
  foodImages: [],
  selections: []
}

const GET_PLACES = 'GET_PLACES'

const GET_MORE_PLACES = 'GET_MORE_PLACES'

const ADD_PLACE_DETAILS = 'ADD_PLACE_DETAILS'

const ADD_PLACE_PHOTOS = 'ADD_PLACE_PHOTOS'

const REMOVE_PLACE_PHOTO = 'REMOVE_PLACE_PHOTO'

const ADD_SELECTION = 'ADD_SELECTION'

const ADD_PLACE_ASSOCIATION = 'ADD_PLACE_ASSOCIATION'

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

export const removePlacePhoto = (photoId) => {
  return { type: REMOVE_PLACE_PHOTO, photoId }
}

export const addSelection = (selection) => {
  return { type: ADD_SELECTION, selection }
}

export const addPlaceAssociation = (placesMap) => {
  return { type: ADD_PLACE_ASSOCIATION, placesMap }
}

export const gettingPlaceDetails = (placeId) => {
  const url = `/api/places/${placeId}`
  return function thunk(dispatch) {
    axios.get(url)
      .then(res => res.data)
      .then(data => {
        if (data.result.photos) {
          const clarifaiRequest = makeJSON(data.result.photos, data.result.place_id)
          console.log(clarifaiRequest)
          dispatch(gettingFoodImages(clarifaiRequest.json))
          dispatch(addPlaceAssociation(clarifaiRequest.placesMap))
        }
      })
  }
}

export const gettingPlacesData = (lat, lng) => {
  let url = `/api/places/lat/${lat}/lng/${lng}`
  let places
  lat = lat || '40.6845305'
  lng = lng || '-73.9412525'
  return function thunk(dispatch) {
    axios.get(url)
      .then(res => res.data)
      .then(data => {
        let token = data.next_page_token
        dispatch(getPlacesData(data))
        url = `/api/places/lat/${lat}/lng/${lng}?token=${token}`
        return axios.get(url)
      })
      .then(res => {
        return res.data
      })
      .then(data => {
        let token = data.next_page_token
        dispatch(getMorePlacesData(data))
        url = `/api/places/lat/${lat}/lng/${lng}?token=${token}`
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

export const gettingFoodImages = (photoJson) => {
  const url = `/api/clarifai/predict/${photoJson}`
  return function thunk(dispatch) {
    axios.get(url)
      .then(res => res.data)
      .then(data => {
        data = data.map(photo => ({ concepts: photo.data.concepts, photo_reference: toPhotoReference(photo.input.data.image.url) }))
        const foodImages = data.filter(photo => photo.concepts.find(isFood))
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
      return { ...state, foodImages: shuffle([...state.foodImages, ...action.placePhotos]) }
    }
    case REMOVE_PLACE_PHOTO: {
      return { ...state, foodImages: [...state.foodImages.filter(img => img.photo_reference !== action.photoId)] }
    }
    case ADD_SELECTION: {
      return { ...state, selections: [...state.selections, action.selection] }
    }
    case ADD_PLACE_ASSOCIATION: {
      const newPlacesMap = action.placesMap
      return { ...state, placesMap: { ...state.placesMap, ...newPlacesMap } }
    }
    default: return state
  }
}

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk, createLogger({ collapsed: true }))))

const makeJSON = (arr, placeId) => {
  let jsonify = []
  const placesMap = {}
  arr.forEach(photo => {
    jsonify.push({ url: photo.photo_reference })
    placesMap[photo.photo_reference] = placeId
  })
  console.log(placesMap)
  return ({json: JSON.stringify(jsonify), placesMap})
}

const toPhotoReference = photoUrl => photoUrl.split('photoreference=')[1]


const isFood = image => (image.name === 'food' && image.value > .98)

const shuffle = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}
