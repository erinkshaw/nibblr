const express = require('express')
const morgan = require('morgan')
const path = require('path')
const app = express()
const axios = require('axios')
const bodyParser = require('body-parser')

// Setup logger
app.use(morgan('dev'))

// For handling my Clarifai batch requests
app.use(bodyParser.json())
   .use(bodyParser.urlencoded({ extended: true }))

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'public')))

app.use('/api/places', require('./api/places'))

// app.use('/api/clarifai', require('./api/clarifai'))

app.get('/*', (_, res) => res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html')))

module.exports = app;




