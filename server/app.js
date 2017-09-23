const express = require('express');
const morgan = require('morgan');
const path = require('path');
const axios = require('axios')
const app = express()
const https = require('https')

// Setup logger
app.use(morgan('dev'))

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'public')))

// Always return the main index.html, so react-router render the route in the client

app.get('/places', (req, res, next) => {
  https.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.705076,-74.00916&radius=500&types=food&key=AIzaSyBv6nWAWnIZgBvtLWsCCSbSjL5DvVhPKEo', (places) => places.pipe(res))
  .on('error', next)
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))
})


module.exports = app;


//my api key

// AIzaSyBYHwQcut25RfGMkrRKC262-ZScpb_h2xM

//lat long for FSA
// @40.705076,-74.00916,15
