const mongoose = require('mongoose');
const { userSchema } = require(__dirname+'/../models/monSchema.js')
const { ejercicioSchema } = require(__dirname+'/../models/monSchema.js')
let Exercise = mongoose.model("exercise", ejercicioSchema);
let User = mongoose.model("User", userSchema);

const getLogById = async (reqBody) => {
  //reqBody = {id, from, to, limit}
  let userLog;
  let count = 0;
  let log = [];

  try {
    let user = await User.findById(reqBody.id);
    let exercises = await Exercise.find({userId: reqBody.id});
    
    /* exercises.map((exercise) => {
              count += 1;
              log.push({
                description: exercise.description,
                duration: exercise.duration,
                date: exercise.date,
              })
            }, 0) */

    if(reqBody.limit != undefined) {
      exercises.map((exercise) => {
              if(count < reqBody.limit) {
                log.push({
                description: exercise.description,
                duration: exercise.duration,
                date: exercise.date,
                })
              }
              count += 1;
            }, 0)
    } else {
      exercises.map((exercise) => {
              count += 1;
              log.push({
                description: exercise.description,
                duration: exercise.duration,
                date: exercise.date,
              })
            }, 0)
    }

    if(reqBody.from && reqBody.to != undefined) {
      let filLog = log.filter((exercise) => (exercise.date >= reqBody.from && exercise.date <= reqBody.to));
      
      userLog = {
      username: user.username,
      count: filLog.length,
      _id: reqBody.id,
      log: filLog
    };
    } else {
       userLog = {
          _id: reqBody.id,
          username: user.username,
          count: log.length,
          log: log
       };
    }
    return userLog;
  } catch(error) {
    throw error;
  } 
};

module.exports = {getLogById}