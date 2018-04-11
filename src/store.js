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
  console.log('start of gettingplacesdetails', Date())
  const url = `/api/places/${placeId}`
  return function thunk(dispatch) {
    console.log('inside details thunk', Date())
    axios.get(url)
      .then(res => res.data)
      .then(data => {
        console.log('second details dot then', Date())
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
  console.log('start of helper', Date())
  let url = placesURL(lat, lng, token);
  axios.get(url)
  .then(res => res.data)
  .then(data => {
    console.log(`second dot then ${more}`, Date())
    dispatch(getPlacesData(data))
    const places = data.results
    places.map(place => dispatch(gettingPlaceDetails(place.place_id)))
    if (more > 0) {
      gettingPlacesDataHelper(dispatch, lat, lng, more - 1, data.next_page_token)
    }
  })
}

export const gettingPlacesData = (lat, lng) => {
  console.log('start gettingplacesdata', Date())
  return function thunk(dispatch) {
    console.log('inside thunk', Date())
    gettingPlacesDataHelper(dispatch, lat, lng, 2, null)
  }
}

export const gettingFoodImages = (photoJson) => {
  console.log('getting food images start', Date())
  const url = `/api/clarifai/predict/${photoJson}`
  return function thunk(dispatch) {
    console.log('start of food images thunk', Date())
    axios.get(url)
      .then(res => res.data)
      .then(data => {
        console.log('second dot then in gettingfoodimages', Date())
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
      return { ...state, places: action.places.results.concat(state.places) }
    }
    case ADD_PLACE_PHOTOS: {
      return { ...state, foodImages: [...state.foodImages, ...action.placePhotos].sort(shuffle) }
    }
    case REMOVE_PLACE_PHOTO: {
      return { ...state, foodImages: [...state.foodImages.filter(img => img.photo_reference !== action.photoId)] }
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

// export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk, createLogger({ collapsed: true }))))
export default createStore(reducer, applyMiddleware(thunk, createLogger({ collapsed: true })))

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
