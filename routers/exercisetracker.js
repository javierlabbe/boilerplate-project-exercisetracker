const express = require('express');

const {createUser, getUsers, getUserById} = require(__dirname+'/../controllers/userController.js')

const {createExercise, getExercisesById} = require(__dirname+'/../controllers/exerciseController.js')

const {getLogById} = require(__dirname+'/../controllers/logController.js')

const routerExTracker = express.Router();

//middleware
const bodyParser = require('body-parser'); //para procesar el cuerpo que no viene en JSON
routerExTracker.use(bodyParser.urlencoded({ extended: true }));; //para procesar el cuerpo de la solicitud

//para guardar un username
routerExTracker.post('/', (req, res) => {
  let username = req.body.username;
  createUser(username)
    .then((savedUser) => {
      console.log('usuario guardado exitosamente:', savedUser)
      res.json({ username: username, _id: savedUser._id.toString()}); //mostrar user guardado
    })
    .catch((error) => {
      console.error(error); //agregar error
    });
})

//para asignar un ejercicio a un user
routerExTracker.post('/:_id/exercises', (req, res) => {
  let reqBody = req.body;

  getUserById(reqBody[":_id"])
    .then((user) => {
      let {username} = user;
      createExercise(reqBody)
        .then((savedExercise) => {
      console.log('ejercicio guardado exitosamente:', savedExercise);
          let {description, duration, date, userId} = savedExercise;
          res.json({
            _id: userId,
            username: username,
            description: description,
            duration: duration,
            date: date
          })
        })
        .catch((error) => {
      console.error('Error al guardar el ejercicio:', error);
        });      
    })
    .catch((error) => {
      console.error('Usuario no existe:', error);
    });
})

//para consultar ejercicios asociados a un user
routerExTracker.get('/:_id/logs', (req, res) => {
   //query params
   let {from, to, limit} = req.query;

   let reqBody = {
     id: req.params._id,
     from: from,
     to: to,
     limit: limit
   };

  console.log(reqBody);
   getLogById(reqBody)
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((error) => console.log(error))
})

//Para consultar todos los usuarios de la base de datos
routerExTracker.get('/', (req, res) => {
  getUsers()
    .then((query) => {
      console.log('Users:', query)
      res.json(query);
    })
    .catch((error) => {
      console.error(error);
    });
})

module.exports = routerExTracker;