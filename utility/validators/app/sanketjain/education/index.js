const Joi = require('joi')

//Sign Up Validation
const educationValidator = data => Joi.assert(data, Joi.object().keys({
        start: Joi.date().required(),
        end: Joi.date().required(),
        graduated: Joi.bool().required().default(true),
        school: Joi.string().required(),
        location: {
            city: Joi.string(), 
            state: Joi.string(), 
            country: Joi.string()
        },
        education_level: Joi.string().required(),
        degree: Joi.string().required(),
        program: Joi.string().required()
    }))

module.exports = educationValidator