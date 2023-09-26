let mongoose = require('mongoose');

/*
* ESQUEMAS DE MOONGOSE
*/

const ejercicioSchema = new mongoose.Schema({
  //definicion del esquema ejercicio
  userId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  }
});

const userSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true, // Indica que se generará automáticamente
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  }
})

module.exports = { ejercicioSchema, userSchema }; // Exportar ambos esquemas