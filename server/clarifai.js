// Require the client
const Clarifai = require('clarifai');

// instantiate a new Clarifai app passing in your API Key
const app = new Clarifai.App({
  apiKey: procces.env.CLARIFAI_API_KEY
 })

 // add some inputs
 app.inputs.create('https://samples.clarifai.com/puppy.jpeg').then(
   searchForDog,
   function(err) {
     console.error(err);
   }
 )

 // search for concepts
 function searchForDog(response) {
   app.inputs.search({
     concept: {
       name: 'dog'
     }
   }).then(
     function(response) {
       console.log(response);
     },
     function(response) {
       console.error(response);
     }
   )
 }
