import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import axios from 'axios'

const defaultState = {
  places: [],
  // placesDetails: {},
  foodImages: []
}

const GET_PLACES = 'GET_PLACES'

const GET_MORE_PLACES = 'GET_MORE_PLACES'

const ADD_PLACE_DETAILS = 'ADD_PLACE_DETAILS'

const ADD_PLACE_PHOTO = 'ADD_PLACE_PHOTO'

export const addPlaceDetails = (place) => {
  return { type: ADD_PLACE_DETAILS, place }
}

export const getPlacesData = (places) => {
  return { type: GET_PLACES, places }
}

export const getMorePlacesData = (places) => {
  return { type: GET_MORE_PLACES, places }
}

//this is only called if top concept is 'food'?
export const addPlacePhoto = (place) => {
  return { type: ADD_PLACE_PHOTO, place }
}

// export const gettingPlaceDetails = (placeId) => {
//   const url = `/places/${placeId}`
//   return function thunk(dispatch) {
//     axios.get(url)
//       .then(res => res.data)
//       .then(data => {
//         if (data.result.photos) {
//           // dispatch(addPlaceDetails(data))
//           // return data.result
//           Promise.all(data.result.photos.map(photo => dispatch(gettingFoodImages(photo.photo_reference, data.result))))
//         }
//       })
//       // .then(data => {
//       //   if (data) {
//       //    Promise.all(data.photos.map(photo => dispatch(gettingFoodImages(photo.photo_reference, data))))
//       //   }
//       //   //PROMISE.ALL FOR OUR CLARIFAI THUNKY
//       //   //DISPATCH SHOULD TAKE TWO ARGS, THE OTHER BEING ALL THE INFO
//       //   //THEN, CREATE AN OBJ FOR EACH TRUE PHOTO IN NEW DISPATCH THAT HAS PLACE_ID
//       // })
//   }
// }

export const gettingPlaceDetails = (placeId) => {
  const url = `/places/${placeId}`
  return function thunk(dispatch) {
    axios.get(url)
      .then(res => res.data)
      .then(data => {
        if (data.result.photos) {
          // dispatch(addPlaceDetails(data))
          // return data.result
          // Promise.all(data.result.photos.map(photo => dispatch(gettingFoodImages(photo.photo_reference, data.result))))
          // console.log(data.result, 'data wheres the infooo??')
          dispatch(gettingFoodImages(makeJSON(data.result.photos, data.result.place_id)))
        }
      })
    // .then(data => {
    //   if (data) {
    //    Promise.all(data.photos.map(photo => dispatch(gettingFoodImages(photo.photo_reference, data))))
    //   }
    //   //PROMISE.ALL FOR OUR CLARIFAI THUNKY
    //   //DISPATCH SHOULD TAKE TWO ARGS, THE OTHER BEING ALL THE INFO
    //   //THEN, CREATE AN OBJ FOR EACH TRUE PHOTO IN NEW DISPATCH THAT HAS PLACE_ID
    // })
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


// export const gettingFoodImages = (photoReference, place) => {
//   const url = `/clarifai/predict/${photoReference}`
//   return function thunk(dispatch) {
//     axios.get(url)
//     .then(res => res.data)
//     .then(data => {
//       // returns truthy val if food, falsey if not
//         if (data) {
//           dispatch(addPlacePhoto({
//             place_id: place.place_id,
//             photo_reference: photoReference
//           }))
//         }
//       })
//   }
// }

export const gettingFoodImages = (photoJson) => {
  const url = `/clarifai/predict/${photoJson}`
  return function thunk(dispatch) {
    axios.get(url)
      .then(res => res.data)
      .then(data => {
        // returns truthy val if food, falsey if not

        console.log(data, 'hiii what areee yooooou?????')
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
    // case ADD_PLACE_DETAILS: {
    //   const newPlacesDetails = state.placesDetails
    //   const placeDetails = action.place.result
    //   newPlacesDetails[placeDetails.place_id] = placeDetails.photos
    //   return Object.assign({}, state, { placesDetails: newPlacesDetails })
    // }
    case ADD_PLACE_PHOTO: {
      return Object.assign({}, state, { foodImages: [...state.foodImages, action.place] })
    }
    default: return state
  }
}

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk, createLogger({ collapsed: true }))))


const makeJSON = (arr, placeId) => {
  let jsonify = []
  console.log(placeId)
  arr.forEach(photo => jsonify.push({ url: photo.photo_reference }))
  return JSON.stringify(jsonify)
}
