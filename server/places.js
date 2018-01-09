const router = require('express').Router()
const axios = require('axios')
require('../secrets')

// get nearby restaurants
router.get('/lat/:lat/lng/:lng', (req, res, next) => {

  let placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.params.lat},${req.params.lng}&radius=500&types=food&key=${process.env.GOOGLE_API_KEY}`

  //if there is a query that means it's the next page token
  placesUrl = req.query.token ? `${placesUrl}&pagetoken=${req.query.token}` : placesUrl

  if (req.query.token) {
    setTimeout(() => {
      axios.get(placesUrl)
      .then(res => res.data)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(next)
    }, 2000)
  }
  else {
    axios.get(placesUrl)
    .then(res => res.data)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(next)
  }
})

// get details for place
router.get('/:placeId', (req, res, next) => {
  console.log('hiiiiiiis')
  const placeUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${req.params.placeId}&key=${process.env.GOOGLE_API_KEY}`

  axios.get(placeUrl)
  .then(res => res.data)
  .then(data => {
    res.status(200).send(data);
  })
  .catch(next)
})

// get image for restaurant
router.get('/img/:photoReference', (req, res, next) => {
  const photoUrl = makeGooglePlacesPhotoURL(req.params.photoReference)
  res.json(photoUrl)
})

// get map for restaurant
router.get('/map/:placeId', (req, res, next) => {
  const placeUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_API_KEY}&q=place_id:${req.params.placeId}`
  res.json(placeUrl)
})

function makeGooglePlacesPhotoURL(photoReference) {
  var baseURL = 'https://maps.googleapis.com/maps/api/place/photo?';
  var maxHeight = 200;
  var fullURL = baseURL + 'key=' + process.env.GOOGLE_API_KEY + '&' + 'maxheight=' + maxHeight + '&' + 'photoreference=' + photoReference;
  return fullURL;
}

module.exports = router
