const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express()
const https = require('https')
require('../secrets')

// Setup logger
app.use(morgan('dev'))

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'public')))

// get nearby restaurants
app.get('/places/lat/:lat/lng/:lng', (req, res, next) => {
  https.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.params.lat},${req.params.lng}&radius=500&types=food&key=${process.env.GOOGLE_API_KEY}`, (places) => places.pipe(res))
    .on('error', next)
})

// get image for restaurant
app.get('/places/img/:photoReference', (req, res, next) => {
  const photoUrl = makeGooglePlacesPhotoURL(req.params.photoReference)
  res.json(photoUrl)
})

app.get('/*', (_, res) => res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html')))

function makeGooglePlacesPhotoURL(photoReference) {
  var baseURL = 'https://maps.googleapis.com/maps/api/place/photo?';
  var maxHeight = 200;
  var fullURL = baseURL + 'key=' + process.env.GOOGLE_API_KEY + '&' + 'maxheight=' + maxHeight + '&' + 'photoreference=' + photoReference;
  return fullURL;
}

module.exports = app;


