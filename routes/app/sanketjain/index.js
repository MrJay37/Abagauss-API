// Imports
const express = require('express');

// Route modules
const EducationRoutes = require('./education')

// Initialize router
const router = express.Router()

// Use routes
router.use('/education', EducationRoutes)

router.get('/', async(req, res) => {
    res.send('Let\'s see what Sanket Jain has')
})

module.exports = router