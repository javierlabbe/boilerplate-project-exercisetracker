const mongoose = require('mongoose');
const { userSchema } = require(__dirname+'/../models/monSchema.js')
const { ejercicioSchema } = require(__dirname+'/../models/monSchema.js')
let Exercise = mongoose.model("exercise", ejercicioSchema);
let User = mongoose.model("User", userSchema);

const getLogById = async (reqBody) => {
  try {
    let user = await User.findById(reqBody.id);

    let {id, from, to, limit} = reqBody;
    let dateObj = {};
    if(from) {
      dateObj["$gte"] = new Date(from);
    }
    if(to) {
      dateObj["$lte"] = new Date(to);
    }
    let filter = {
      userId: id
    }
    if(from || to) {
      filter.date = dateObj;
    }

    let exercises = await Exercise.find(filter).limit(+limit ?? 500);
    console.log(exercises)
    const log = exercises.map( e => ({
      description: e.description,
      duration: e.duration,
      date: e.date.toDateString()
    }))

    let userLog = {
      username: user.username,
      count: exercises.length,
      _id: user._id,
      log
    }

    return userLog;
  } catch(error) {
    throw error;
  } 
};

module.exports = {getLogById}