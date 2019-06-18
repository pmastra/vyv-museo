'use strict';
const mongoose = require('mongoose');
const Schema  = mongoose.Schema;


const CiudadSchema = Schema({
  idCiudad: Number,
  idProvincia:  {type: Number, ref: 'Provincia'},
  nombre: String,
});

module.exports = mongoose.model('Ciudad', CiudadSchema);
