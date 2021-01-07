//Imports
const express = require('express');
require('dotenv/config')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors');
const sendEmail = require('./utility/emailer')

//Routes
const authRoutes = require('./routes/auth')
const appRoutes = require('./routes/app')

//Initialize
const app = express();

//Middleware 
app.use(bodyParser.json())
app.use(cors())

//Routes
app.use('/auth', authRoutes)
app.use('/app', appRoutes)



//Database
mongoose.connect(process.env.DB_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }).then(() => console.log('DB Connected')).catch((err) => console.log(err))

//Start listening
app.listen(3700);
