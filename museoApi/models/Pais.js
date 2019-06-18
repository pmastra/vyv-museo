'use strict';
const mongoose = require('mongoose');
const Schema  = mongoose.Schema;


const PaisSchema = Schema({
  idPais: Number,
  nombre: String,
//   field: type,
});

module.exports = mongoose.model('Pais', PaisSchema);
