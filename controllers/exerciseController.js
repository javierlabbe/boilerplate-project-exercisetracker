const mongoose = require('mongoose');

const { ejercicioSchema } = require(__dirname+'/../models/monSchema.js')

let Exercise = mongoose.model("exercise", ejercicioSchema);

//Funcion para crear y guardar un usuario
const createExercise = async (reqBody, id) => {
  let  {description, duration, date} = reqBody; 
 
  if(date == '' || date == undefined) {
    date = new Date();
  } else {
    date = new Date(date) //date es recibido como string, aqui lo pasamos a Date
  }

  try {
    let newExercise = new Exercise({
      userId: id,
      date: date,//.toDateString(undefined, opcionesDeFecha),
      duration: parseInt(duration),
      description: description
    });
    
    let savedExercise = await newExercise.save();
    let response = {
      userId: id,
      date: date.toDateString(),
      duration: parseInt(duration),
      description: description
    }
    return response;
  } catch (error) {
    throw error;
  }
};

//Funcion para encontrar exercises asociados a un ID
const getExercisesById = async (id) => {
  let query = await Exercise.find({userId: id});
  return query;
};

module.exports = {createExercise, getExercisesById}