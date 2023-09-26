const mongoose = require('mongoose');

const { ejercicioSchema } = require(__dirname+'/../models/monSchema.js')

let Exercise = mongoose.model("exercise", ejercicioSchema);

//Funcion para crear y guardar un usuario
const createExercise = async (reqBody) => {
  let  { [":_id"]: id, description, duration, date} = reqBody; //[":_id": id] asigna el valor de la propiedad :_id a id
  try {
    let newExercise = new Exercise({
      userId: id,
      description: description,
      duration: duration,
      date: date
    });
    
    let savedExercise = await newExercise.save();
    return savedExercise;
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