'use strict'

const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const MedidasPiezaSchema = Schema({
    ancho:Number,
    largo: Number,
    alto: Number,
    diametro: Number,
    circunferencia: Number
})

const Dupla = Schema({
    nombre:String,
    descripcion:String
})

const PiezaSchema = Schema({
   identificador: String,
   tipoPieza: String,
   medidasPieza:MedidasPiezaSchema,
   imagenesPieza:[Dupla],
   fechaIngreso:Date,
   fechaBaja:Date,
   motivoBaja:String,
   perteneceEjemplar: String,
   origen: {type: String, enum:['ExcavaciónPropia', 'Donación','Préstamo']}
})

module.exports = mongoose.model('Pieza', PiezaSchema)