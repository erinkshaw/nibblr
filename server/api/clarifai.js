const router = require('express').Router()
const makeGooglePlacesPhotoURL = require('./places').makeGooglePlacesPhotoURL
const Clarifai = require('clarifai');
if (process.env.NODE_ENV !== 'production') require('../../secrets')

const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY
})

const MOCK_CLARIFAI = true

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


// BATCH PHOTOS JSON [ { url: 'CmRaAAAAE1B_FxutshLV6JpI9KCJ-fv-CT2b0SHozQIQpa7-QVhWj5ep3ZRz5h3UvkFUOBQewlBR9aWCRCxfIcuuaBoawLLXp-uznWLzaDnGPd7gN7lF8QERYz3XMlGtYPyTjIjnEhCR_fOSSjOnPst2OvJACFg0GhQvCNV6CiUiqTiCKNLfA3v7GNiePQ' },
// ]

// { id: 'a44575541bd54be59efeafa2370f64c7',
// status: { code: 10000, description: 'Ok' },
// created_at: '2018-04-11T15:44:34.553731408Z',
// model:
//  { id: 'aaa03c23b3724a16a56b629203edc62c',
//    name: 'general-v1.3',
//    created_at: '2016-03-09T17:11:39.608845Z',
//    app_id: 'main',
//    output_info: [Object],
//    model_version: [Object],
//    display_name: 'General' },
// input: { id: 'da28d951df5441f6b301fdb555284f94', data: [Object] },
// data: { concepts: [Object] } }
