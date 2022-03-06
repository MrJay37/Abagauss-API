const express = require('express');
const Auth = require('../../models/auth')
const verify = require('../../utility/jwtVerify')

const router = express.Router()

router.get('/', verify, async(req, res) => {
    res.send('Hello from Abagauss')
})

module.exports = router