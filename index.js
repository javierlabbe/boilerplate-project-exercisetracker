const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config({path: 'sample.env'})
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }); //para conectarnos a la base de datos

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

//Endpoints
const routerExTracker = require(__dirname+'/routers/exercisetracker.js') //importando modulo del router

app.use('/api/users', routerExTracker); //para usar las rutas definidas en router

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

