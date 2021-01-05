const Joi = require('joi')

//Sign Up Validation
const signupValidator = data => Joi.assert(data, Joi.object().keys({
        name: Joi.string().min(6).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(8).required()
    }))

//Sign In Validation
const signinValidator = data => Joi.assert(data, Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required()
}))

module.exports = {
    signupValidator,
    signinValidator
}