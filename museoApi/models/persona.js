'use strict'

const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const PersonaSchema = Schema({
    nombres:String,
    apellidos: String,
    dni: Number,//numero plano sin puntos
    fechaInicio: Date,
    titulos:[String],
    foto: String, // foto de la persona es un archivo.jpg donde se almacenan todas las fotos de les personas
    fechaBaja: Date,
    motivoBaja:String,
   
})

module.exports = mongoose.model('Persona', PersonaSchema)