// Imports
const express = require('express');

// Route modules
const EducationRoutes = require('./education')

// Initialize router
const router = express.Router()

// Use routes
router.use('/education', EducationRoutes)

// Export router
module.exports = router