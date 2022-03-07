// Imports
const express = require('express');
const verify = require('../../utility/jwtVerify')

// Initialize router
const router = express.Router()

// Route modules
const MeRoutes = require('./me')
const SanketJainRoutes = require('./sanketjain')

// Use routes
router.use('/me', verify, MeRoutes)
router.use('/sanketjain', verify, SanketJainRoutes)

router.get('/', verify, async(req, res) => {
    res.send('Hello from Abagauss')
})

module.exports = router