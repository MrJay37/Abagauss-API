const mongoose = require('mongoose')

const EducationSchema = mongoose.Schema({
    start: {
        type: Date
    },
    end: {
        type: Date
    },
    graduated: {
        type: Boolean
    },
    school: {
        type: String
    },
    location: {
        city: {
            type: String
        }, 
        state: {
            type: String
        }, 
        country: {
            type: String
        }
    },
    education_level: {
        type: String
    },
    degree: {
        type: String
    },
    program: {
        type: String
    }
})

module.exports = mongoose.model('Education', EducationSchema)