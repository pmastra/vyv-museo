'use strict'

const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const AreaGeologicaSchema = Schema({
    formacion:String,
    grupo:String,
    subgrupo: String,
    edad:Number,
    periodo: String,
    era:String    
})

const AreaHallazgoSchema = Schema({
    nombreArea:String,
    pais:String,
    ciudad:String,
    provincia:String
})

const Dupla = Schema({
    nombre:String,
    descripcion:String
})

const EjemplarSchema = Schema({
   tipoEjemplar:{type: String, enum:['encontrado', 'no encontrado']},
   taxonReino:String,
   taxonFilo:String,
   taxonClase:String,
   taxonOrden:String,
   taxonFamilia:String,
   taxonGenero:String,
   taxonEspecie:String,
   eraGeologica:[AreaGeologicaSchema],
   ilustracionCompleta:String,
   descripcionIC:String,
   areaHallazgo:[AreaHallazgoSchema],
   nroColeccion:String,
   dimensionLargo:Number,
   dimensionAlto:Number,
   peso:Number,
   alimentacion:String,
   fechaIngresoColeccion:Date,
   ubicacionMuseo: String,
   fotosEjemplar:[Dupla],
   videosEjemplar:[String],
   fechaBaja: Date,
   motivoBaja:String,
   nombre:String,
   periodo:String,
   home:Boolean,
   descripcion1:String,
   descripcion1A:String,
   descripcion2:String,
   descripcion3:String,
   perteneceExca:String
})

module.exports = mongoose.model('Ejemplar', EjemplarSchema)