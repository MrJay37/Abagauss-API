const express = require('express');
const Auth = require('../../models/auth')
const verify = require('../../utility/jwtVerify')

const router = express.Router()

router.get('/', verify, async(req, res) => {
    const data = await Auth.find()
    return res.json(data.map(user => ({name: user.name})))
})

module.exports = router