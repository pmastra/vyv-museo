'use strict';
const mongoose = require('mongoose');
const Schema  = mongoose.Schema;


const ExploracionSchema = new Schema({
  idExploracion: String,
  nombre: String,
  fecha: Date,
  idExcavaciones: [
    { type: String, ref: 'Excavacion' }
  ],
  idArea: { type: String, ref: 'Area' },
});


module.exports = mongoose.model('Exploracion', ExploracionSchema);
