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

app.use('/places', require('./places'))

app.get('/*', (_, res) => res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html')))

module.exports = app;




