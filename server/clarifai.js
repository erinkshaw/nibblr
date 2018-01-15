const router = require('express').Router()
const makeGooglePlacesPhotoURL = require('./places').makeGooglePlacesPhotoURL
const Clarifai = require('clarifai');
require('../secrets')

// instantiate a new Clarifai app passing in your API Key
const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY
 })

 console.log(makeGooglePlacesPhotoURL)
 router.get('/predict/:photoreference', (req, res, next) => {
  const photoreference = req.params.photoreference
  // const imgUrl = makeGooglePlacesPhotoURL(photoreference)
  // app.models.predict(Clarifai.GENERAL_MODEL, imgUrl).then(
  //   function(response) {
  //     console.log(response)
  //     // do something with response
  //   },
  //   function(err) {
  //     console.log(error)
  //     // there was an error
  //   }
  // )
  res.send('hi :(')
 })

//  function makeGooglePlacesPhotoURL(photoReference) {
//   var baseURL = 'https://maps.googleapis.com/maps/api/place/photo?';
//   var maxHeight = 200;
//   var fullURL = baseURL + 'key=' + process.env.GOOGLE_API_KEY + '&' + 'maxheight=' + maxHeight + '&' + 'photoreference=' + photoReference;
//   return fullURL;
// }

 router.get('/', (req, res, next) => {
  res.send('hi')
})

 //using to conditionally send when food is met?

 module.exports = router
