'use strict';
const mongoose = require('mongoose');
const Schema  = mongoose.Schema;


const ProvinciaSchema = Schema({
  idProvincia: Number,
  idPais:  {type: Number, ref: 'Pais'},
  nombre: String,
});

module.exports = mongoose.model('Provincia', ProvinciaSchema);
