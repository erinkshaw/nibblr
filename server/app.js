const express = require('express')
const morgan = require('morgan')
const path = require('path')
const app = express()
const axios = require('axios')

require('../secrets')

// Setup logger
app.use(morgan('dev'))

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'public')))



//&pagetoken=
// get nearby restaurants
app.get('/places/lat/:lat/lng/:lng', (req, res, next) => {
  const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.params.lat},${req.params.lng}&radius=500&types=food&key=${process.env.GOOGLE_API_KEY}`

  axios.get(placesUrl)
  .then(res => res.data)
  .then(data => {
    res.status(200).send(data);
  })
})

// get image for restaurant
app.get('/places/img/:photoReference', (req, res, next) => {
  const photoUrl = makeGooglePlacesPhotoURL(req.params.photoReference)
  res.json(photoUrl)
})

// get map for restaurant
app.get('/places/map/:placeId', (req, res, next) => {
  const placeUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_API_KEY}&q=place_id:${req.params.placeId}`
  res.json(placeUrl)
})

app.get('/*', (_, res) => res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html')))

function makeGooglePlacesPhotoURL(photoReference) {
  var baseURL = 'https://maps.googleapis.com/maps/api/place/photo?';
  var maxHeight = 200;
  var fullURL = baseURL + 'key=' + process.env.GOOGLE_API_KEY + '&' + 'maxheight=' + maxHeight + '&' + 'photoreference=' + photoReference;
  return fullURL;
}

module.exports = app;




