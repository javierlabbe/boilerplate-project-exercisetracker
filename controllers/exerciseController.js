const mongoose = require('mongoose');

const { ejercicioSchema } = require(__dirname+'/../models/monSchema.js')

let Exercise = mongoose.model("exercise", ejercicioSchema);

//Funcion para crear y guardar un usuario
const createExercise = async (reqBody, id) => {
  let  {description, duration, date} = reqBody; 
  const opcionesDeFecha = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };//[":_id": id] asigna el valor de la propiedad :_id a id
  console.log(reqBody)
  if(date == '' || date == undefined) {
    const today = new Date();
    const year = today.getFullYear(); 
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0'); 
    date = `${year}-${month}-${day}`;
  }

  try {
    let newExercise = new Exercise({
      userId: id,
      date: new Date(date).toDateString(undefined, opcionesDeFecha),
      duration: duration,
      description: description
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