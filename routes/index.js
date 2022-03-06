//Imports
const express = require('express');

//Routes
const authRoutes = require('./auth')
const appRoutes = require('./app')

app = express.Router()

//Use routes
app.use('/', appRoutes)
app.use('/auth', authRoutes)

module.exports = app