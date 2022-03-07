// ODM Import
const mongoose = require('mongoose');

// Get db items from the env file
const db_protocol = process.env.DB_PROTOCOL
const db_user = process.env.DB_USERNAME
const db_password = process.env.DB_PASSWORD
const db_host = process.env.DB_HOST
const db_port = process.env.DB_PORT
const db_name = process.env.DB_NAME

// Create connection string
const connection_string = `${db_protocol}://${db_host}:${db_port}/${db_name}`

// If username and password are provided
if (db_user !== '' & db_password !== ''){
    // Add to connection string
    connection_string = `${db_protocol}://${db_user}:${db_password}@${db_host}:${db_port}/${db_name}`
}

// Connect to the database
mongoose.connect(connection_string, { useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => {
        // If environment is development
        if (process.env.ENV === 'DEVELOPMENT'){
            // Log connection message
            console.log('Connected to Mongo DB')
        }
    })
    .catch(err => console.log(err.message));
