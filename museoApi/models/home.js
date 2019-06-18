'use strict'

const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const Dupla = Schema({
    nombre:String,
    descripcion:String
})

const HomeSchema = Schema({
    tituloMuseo:String,
    tituloIntroduccion: String,
    introduccion: String,
    objetivoMuseo: String,
    significadoHallazgo: String,
    definicionEraGeologica:String,
    fotosHome:[Dupla], 
})

module.exports = mongoose.model('Home', HomeSchema)