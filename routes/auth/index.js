// Imports
const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Auth = require('../../models/auth')
const { signupValidator, signinValidator } = require('../../utility/validators/auth')

// Initialize router
const router = express.Router()

// Function to sign user in
async function signIn(email, password) {
    try{
        // Validate email ID string and password
        signinValidator({ email, password })

    } catch(error) {
        // If validation fails, return 400 and error body
        return {
            status: 400,
            body: {
                error: {
                    message: 'Invalid email or password'
                }
            }
        }
    }
    console.log('Sign in requested for ' + email)
    // Find user with the email ID
    const user = await Auth.findOne({ email })
    // If none found
    if(!user) {
        console.log('User record with email ID ' + email + ' not found')
        return {
            status: 400,
            body: {
                error: {
                    message: 'User with the email address not found'
                }
            }
        }
    }
    // Check password 
    const password_check = await bcrypt.compare(password, user.password)

    // If password check fails
    if (!password_check) {
        console.log('Password verification failed for user with email ID ' + email)
        return {
            status: 400,
            body: {
                error: {
                    message: 'Incorrect password'
                }
            }
        }
    }

    try {
        console.log('User signed in, creating JSON Web Token')
        // Try creating JWT token
        const jwtToken = jwt.sign(
            {
                _id: user._id
            },
            // Use private key from the environment file
            process.env.TOKEN_SECRET
        )
        console.log('Sign in successful')

        return { 
            status: 200,
            body: {
                message: 'Sign In Successful', 
                token: jwtToken, 
                userData: { 
                    name: user.name, 
                    id: user._id, 
                    email: user.email 
                }
            }
        } 

    } catch (err){
        console.log('JSON Web Token creation failed, please check systems')
        return {
            status: 400,
            body: {
                error: {
                    message: 'An error occured, please '
                }
            }
        }
    }

}

//SIGN UP END-POINT
router.post('/signup', async (req, res) => {
    console.log('Sign up requested for ' + req.body.email)
    try{
        // Validate username, email ID and password
        signupValidator(
            {
                // Defining entire dictionary here to remember keys needed for sign up
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }
        )
    }
    catch (error) {
        // Return 400 error with invalid email or password message
        return res.status(400).json({message: 'Invalid email or password'})
    }
    
    // Check if user already exists in the database
    const exists = await Auth.findOne({email: req.body.email})
    
    // If user already exists
    if (exists) {
        console.log('User with email ID ' + req.body.email + ' already exists')
        return res
            .status(400)
            .json(
                {
                    message: 'User already exists'
                }
            )
    }

    // Generate salt
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT))
    // Get hashed password
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    
    // Create credentials document
    const cred = new Auth({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    
    try{
        // Save credentials document
        await cred.save()
        console.log('User registration completed')

    } catch(error) {
        res.json({message: error})
    }

    // Sign user in
    const signInRes = await signIn(req.body.email, req.body.password)
    // Return response
    res.status(signInRes.status).json(signInRes.body)    
})

//SIGN IN END-POINT
router.post('/signin', async (req, res) => {
    console.log(req.body)
    // Sign user in
    const signInRes = await signIn(req.body.email, req.body.password)
    // Return response
    res.status(signInRes.status).json(signInRes.body)    
})

// Delete user end point
router.delete('/', async (req, res) => {
    const userToDelete = req.body.email
    console.log('User record deletion request for ' + userToDelete)

    try{
        // Get delete response from database
        const response = await Auth.deleteOne({email: userToDelete})
        // If deleted count is greater than 0
        if(response.deletedCount > 0){
            // Respond with User successfully deleted message
            return res.status(200).json({message: 'User successfully deleted'})
        } else {
            // Respond with user not found message
            return res.status(404).json({message: 'User not found'})
        }
    } catch(err){
        res.status(500).json({message: err})
    }

})

module.exports = router