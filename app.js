//Imports
const express = require('express');
require('dotenv/config')
const bodyParser = require('body-parser')
const cors = require('cors');

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

app.get('/', (req, res) => {
    res.send('Hello from Abagauss')
})


//Start listening
app.listen(process.env.PORT, () => {
    console.clear()
    console.log('Server initialized on port ' + String(process.env.PORT))
});
