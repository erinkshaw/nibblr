const router = require('express').Router()
const makeGooglePlacesPhotoURL = require('./places').makeGooglePlacesPhotoURL
const Clarifai = require('clarifai');
require('../../secrets')

const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY
})

router.get('/predict/:batchPhotosJSON', (req, res, next) => {
  let batchPhotosJSON = JSON.parse(req.params.batchPhotosJSON)
  batchPhotosJSON.map(photo => photo.url = makeGooglePlacesPhotoURL(photo.url))
  app.models.predict(Clarifai.GENERAL_MODEL, batchPhotosJSON).then(response => {
      res.json(response.outputs)
    },
    (err) => {
      console.log(err)
    }
  )
})



module.exports = router
