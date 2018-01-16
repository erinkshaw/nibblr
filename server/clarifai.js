const router = require('express').Router()
const makeGooglePlacesPhotoURL = require('./places').makeGooglePlacesPhotoURL
const Clarifai = require('clarifai');
require('../secrets')

// instantiate a new Clarifai app passing in your API Key
const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY
})

// // analyze google place photo's top concepts
// router.get('/predict/:photoreference', (req, res, next) => {
//   const photoreference = req.params.photoreference
//   const imgUrl = makeGooglePlacesPhotoURL(photoreference)

//   //returns top concept.
//   app.models.predict(Clarifai.GENERAL_MODEL, imgUrl).then(
//     function (response) {
//       const isFood = (image => image.name === 'food')
//       const foodConcept = response.outputs[0].data.concepts.find(isFood)
//       const topConcept = response.outputs[0].data.concepts[0].name
//       res.send(foodConcept)
//     },
//     function (err) {
//       res.send(err)
//     }
//   )

// })

router.get('/predict/:batchPhotosJSON', (req, res, next) => {
  let batchPhotosJSON = JSON.parse(req.params.batchPhotosJSON)
  batchPhotosJSON.map(photo => photo.url = makeGooglePlacesPhotoURL(photo.url))
  // batchPhotosJSON = JSON.stringify(batchPhotosJSON)
  console.log(batchPhotosJSON)

  app.models.predict(Clarifai.GENERAL_MODEL, batchPhotosJSON).then(
    (response) => {
      let updatedResponse = response.outputs
      // const isFood = (image => image.name === 'food')
      // const foodConcept = response.outputs[0].data.concepts.find(isFood)
      // const topConcept = response.outputs[0].data.concepts[0].name
      // res.send(foodConcept)
      res.send(updatedResponse)
    },
    (err) => {
      console.log(err)
    }
  )

})

const toPhotoReference = (photoUrl) => {
  return photoUrl.split('photoreference=')[1]
}


module.exports = router
