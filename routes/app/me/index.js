const express = require('express');
const Auth = require('../../../models/auth')

const router = express.Router()

router.get('/', async(req, res) => {
    // Get document from the collection which has the same email ID field
    const data = await Auth.find({email: req.body.email})

    // If none found
    if (data.length === 0){
        // Respond with error object
        res
        .status(404)
        .json(
            {
                'error': {
                    'message': 'No records with such email found'
                }
            }
        )
    }
    // If found, return name and email fields in object
    return res
        .status(200)
        .json(data.map(user => (
            {
                name: user.name,
                email: user.email
            }
        ))[0])
})

module.exports = router