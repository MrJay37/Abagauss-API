//Imports
const express = require('express');

//Routes
const authRoutes = require('./auth')
const appRoutes = require('./app')

app = express.Router()

//Use routes
app.use('/auth', authRoutes)
app.use('/', appRoutes)

module.exports = app