const router = require('express').Router()
const makeGooglePlacesPhotoURL = require('./places').makeGooglePlacesPhotoURL
const Clarifai = require('clarifai');
if (process.env.NODE_ENV !== 'production') require('../../secrets')

const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY
})

const MOCK_CLARIFAI = false

router.get('/predict/:batchPhotosJSON', (req, res, next) => {
  let batchPhotosJSON = JSON.parse(req.params.batchPhotosJSON)

  if (MOCK_CLARIFAI) {
    let mockJSON = batchPhotosJSON.map(photo => {
      return {
        data: {
          concepts: [{
            name: "food",
            value: 1.0,
          }]
        },
        input: {
          data: {
            image: {
              url: makeGooglePlacesPhotoURL(photo.url)
            }
          }
        }
      }
    })
    res.json(mockJSON)
  } else {
    batchPhotosJSON.map(photo => photo.url = makeGooglePlacesPhotoURL(photo.url))
    app.models.predict(Clarifai.GENERAL_MODEL, batchPhotosJSON).then(response => {
        res.json(response.outputs)
      },
      (err) => {
        console.log(err)
      }
    )
  }
})

module.exports = router
