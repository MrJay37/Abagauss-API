// Imports
const express = require('express');
const Education = require('../../../../models/app/sanketjain/education')
const educationValidator = require('../../../../utility/validators/app/sanketjain/education')

// Initialize router
const router = express.Router()

// Get all education documents
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
                        ...education["_doc"]
                    }
                ))
            )
    }
    catch (err){
        throw err
    }
})

// Get education document with a given ID
router.get('/:id', async(req, res) => {
    try{
        // Get education data
        const education_data = await Education.findById(req.params.id)
        // Return education data as list
        res
            .status(200)
            .json(education_data)
    }
    catch (err){
        res.status(500).json({message: err.message})
    }
})

// Create education document
router.post('/', async(req, res) => {
    const education_obj = {...req.body}

    try{
        // Validate info
        educationValidator(education_obj)
    } catch(err){
        console.log(err.message)
        return res
            .status(400)
            .json(
                {
                    errors: {
                        message: err.message
                    }
                }
            )
    }
    // Create new education data
    const education = new Education(education_obj)
    try{
        // Save data in the database
        const education_record = await education.save()
        // Return education data as list
        return res
            .status(200)
            .json(education_record)
    }
    catch (err){
        throw err
    }
})

// Update education document
router.put('/:educationId', async(req, res) => {
    const education_obj = {...req.body}

    try{
        // Validate info
        educationValidator(education_obj)
    } catch(err){
        console.log(err.message)
        return res
            .status(400)
            .json(
                {
                    errors: {
                        message: err.message
                    }
                }
            )
    }

    try{
        // Save data in the database
        const education_record = await Education.findOneAndUpdate(
            {_id: req.params.educationId}, 
            education_obj,
            {
                returnOriginal: false,
                useFindAndModify: false
            }
        )
        
        // Return education data as list
        return res
            .status(200)
            .json(education_record)
    }
    catch (err){
        throw err
    }
})

// Delete document
router.delete('/:educationId', async(req, res) => {
    try{
        console.log('Education record deletion request for ' + req.params.educationId)
        // Get delete response from database
        const response = await Education.deleteOne({_id: req.params.educationId})
        // If deleted count is greater than 0
        if(response.deletedCount > 0){
            // Respond with User successfully deleted message
            return res.status(200).json({message: 'Education record deleted'})
        } else {
            // Respond with user not found message
            return res.status(404).json({message: 'Education record not found'})
        }
    } catch(err){
        console.log(err)
        res.status(500).json({message: err})
    }
})

// Export router
module.exports = router