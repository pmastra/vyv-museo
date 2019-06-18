'use strict';
const mongoose = require('mongoose');
const Schema  = mongoose.Schema;


const PolygonSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Polygon'],
    required: true
  },
  coordinates: {
    type: [[[Number]]],
    required: true
  }
});

const AreaSchema = new Schema({
  idArea: String,
  nombre: String,
  idCiudad: {type: Number, ref: 'Ciudad'},
  idProvincia: {type: Number, ref: 'Provincia'},
  idPais: {type: Number, ref: 'Pais'},
  locacion: PolygonSchema
});

module.exports = mongoose.model('Area', AreaSchema);
