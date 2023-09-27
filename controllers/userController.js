const mongoose = require('mongoose');

const { userSchema } = require(__dirname+'/../models/monSchema.js')

let User = mongoose.model("User", userSchema);

//Funcion para crear y guardar un usuario
const createUser = async (username) => {
  try {
    let newUser = new User({
      username: username
    });
      let savedUser = await newUser.save();
      return savedUser;
  } catch (error) {
    console.error(error)
    let user = await User.find({username: username});
    return user[0];
  }
};  

//Funcion para mostrar todos los usuarios
const getUsers = async () => {
  let query = await User.find({});
  let users = []
  query.map((user) => {
    let resUser = {
      _id: user._id.toString(),
      username: user.username,
      __v: user.__v
    }
    users.push(resUser);
  })
  return users;
};

//Funcion para consultar si existe un user segun id
const getUserById = async (id) => {
try {
  let query = await User.findById(id);
  return query;
  } catch (error) {
    throw error;
  }
};

module.exports = {createUser, getUsers, getUserById};