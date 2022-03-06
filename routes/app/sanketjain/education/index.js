// Imports
const express = require('express');
const Education = require('../../../../models/app/sanketjain/education')

// Initialize router
const router = express.Router()

// Get route
router.get('/', async(req, res) => {
    // Get education data
    const education_data = await Education.find()

    try{
        // Return education data as list
        res
            .status(200)
            .json(
                education_data.map((education) => (
                    {
                        ...education
                    }
                ))
            )
    }
    catch (err){
        throw err
    }
})

// Get route
router.get('/:id', async(req, res) => {
    console.log(req.params.id)
    // Get education data
    const education_data = await Education.findById(req.params.id)

    try{
        // Return education data as list
        res
            .status(200)
            .json(
                education_data.map((education) => (
                    {
                        ...education
                    }
                ))
            )
    }
    catch (err){
        throw err
    }
})

module.exports = router