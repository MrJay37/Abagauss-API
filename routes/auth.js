const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Auth = require('../models/auth')
const {signupValidator, signinValidator} = require('../utility/validators')


const router = express.Router()

//SIGN UP END-POINT
router.post('/signup', async (req, res) => {
    try{
        signupValidator(req.body)
    }
    catch (error) {
        return res.status(400).json({message: 'Invalid email or password'})
    }

    const exists = await Auth.findOne({email: req.body.email})
    
    if (exists) return res.status(400).json({message: 'User already exists'})

    const salt = await bcrypt.genSalt(process.env.SECRET_SALT)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const cred = new Auth({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    
    try{
        const response = await cred.save()
        res.json(response)
    } catch(error) {
        res.json({message: error})
    }
})

//SIGN IN END-POINT
router.post('/signin', async (req, res) => {
    try{
        signinValidator(req.body)
    } catch(error) {
        return res.json({message: 'Invalid email or password'})
    }

    const user = await Auth.findOne({email: req.body.email})
    if(!user) return res.status(400).json({message: 'User does not exist'})
    
    const password = await bcrypt.compare(req.body.password, user.password)
    if (!password) return res.status(400).json({message: 'Invalid password'})

    const jwtoken = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', jwtoken)
    res.json({ message: 'Logged In', credentials: { name: user.name, _id: user._id } } )
    
})

router.delete('/delete', async (req, res) => {
    const userToDelete = req.body.email

    try{
        const response = await Auth.deleteOne({email: userToDelete})

        if(response.deletedCount > 0){
            return res.status(200).json({message: 'User successfully deleted'})
        } else {
            return res.status(400).json({message: 'User not found'})
        }
    } catch(err){
        res.json({message: err})
    }

})

module.exports = router