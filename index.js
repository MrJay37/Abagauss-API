//Imports
const express = require('express');
require('dotenv/config')
const bodyParser = require('body-parser')
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sanketJainContent')
    .then(() => console.log('Connected to Mongo DB'));

//Initialize
const app = express();

// Routes
const Routes = require('./routes')

//Middleware 
app.use(bodyParser.json())
app.use(cors())

// Routes
app.use('/', Routes)


//Start listening
app.listen(process.env.PORT, () => {
    console.clear()
    console.log('Server initialized on port ' + String(process.env.PORT))
});
