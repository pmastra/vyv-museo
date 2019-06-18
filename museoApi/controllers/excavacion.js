'use strict';
const Excavacion = require('../models/excavacion');
const servicioExcavacion = require('../services/excavacion');


// busca una excavacion por su ID - clave mongo
const getExcavacion = (req, res) => servicioExcavacion.getExcavacion(req, res);

const getAreaExcavacion = (req, res) => servicioExcavacion.getAreaExcavacion(req, res);

function getExcavacionNombre(req, res) { // busca una excavacion por nombre
    let excavacion = req.params.excavacionId
    Excavacion.findOne({'nombre':excavacion}, (err,excavacion)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!excavacion) return res.status(404).send({message:`La excavacion no existe buscada`})
        res.status(200).send({excavacion: excavacion})
    })
}

const getExcavaciones = (req, res) => servicioExcavacion.getExcavaciones(req, res);

function getExcavacionesHome(req,res){ //busca una excavacion para mostrar en home parametro 1 2 3
    let excavacion = req.params.excavacionId
    Excavacion.find({'muestraHome':excavacion}, (err,excavacion)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!excavacion) return res.status(404).send({message:`La excavacionHome no existe buscada`})
        res.status(200).send({excavacion: excavacion})
    })
}

function getExcavacionesDirector(req,res){
    let directorId = req.params.excavacionId
    Excavacion.find({'directorId':directorId},(err,excavaciones)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!excavaciones) return res.status(404).send({message:`No existen excavaciones con el Director: ... `+ directorId})
        res.status(200).send({excavaciones: excavaciones})
    })
}

function getExcavacionesPaleontologo(req,res){
    let paleontologo = req.params.excavacionId
    Excavacion.find({'paleontologo':paleontologo},(err,excavaciones)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!excavaciones) return res.status(404).send({message:`No existen excavaciones con el Paleontologo: ... `+ paleontologo})
        res.status(200).send({excavaciones: excavaciones})
    })
}

function getExcavacionesColector(req,res){
    let colector = req.params.excavacionId
    Excavacion.find({'colector':colector},(err,excavaciones)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!excavaciones) return res.status(404).send({message:`No existen excavaciones con el Director: ... `+ colector})
        res.status(200).send({excavaciones: excavaciones})
    })
}

function saveExcavacion(req,res){
    console.log('POST /api/excavacion')
    console.log(req.body)
      
    let excavacion = new Excavacion()
    excavacion.nombre = req.body.nombre
	excavacion.codigo = req.body.codigo
    excavacion.descripcion = req.body.descripcion
	excavacion.fechaInicio = req.body.fechaInicio
	excavacion.fechaBaja = req.body.fechaBaja
	excavacion.motivoBaja = req.body.motivoBaja
	excavacion.director = req.body.director
	excavacion.directorId = req.body.directorId
	excavacion.colector = req.body.colector
	excavacion.paleontologo = req.body.paleontologo
	excavacion.bochonesEncontrados = req.body.bochonesEncontrados
	
	excavacion.puntoGPS = req.body.puntoGPS
	excavacion.idArea = req.body.idArea
	excavacion.idExploracion = req.body.idExploracion
	excavacion.idPais = req.body.idPais
	excavacion.idCiudad = req.body.idCiudad
	excavacion.idProvincia = req.body.idProvincia
	
	excavacion.muestraHome=req.body.muestraHome
	
	
    
    excavacion.save((err,excavacionStored)=> {
        if(err) res.status(500).send({message:`Error al salvar en la Base de Datos:${err}`})
        res.status(200).send({excavacion: excavacionStored})
    })
}

function getExcavacionId(req, res) { // busca una excavacion por su ID - clave mongo
    let excavacionId = req.params.excavacionId
    Excavacion.findById(excavacionId, (err,excavacionId)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!excavacionId) return res.status(404).send({message:`La excavacion no existe`})
        res.status(200).send({excavacionId: excavacionId})
    })
}

function updateExcavacion(req,res){
    let excavacionId= req.params.excavacionId
    let update= req.body
    console.log('POST /api/excavacion/:ExcavacionId UpdateExcavacion......')
    console.log(req.body)
    
    Excavacion.findByIdAndUpdate(excavacionId, update, (err, excavacionUpdate)=>{
        if(err) return  res.status(500).send({message: `Error al tratar de actualizar: ${err}`})
        if(!excavacionUpdate) return res.status(404).send({message:`La excavacion Update no Existe`})
        res.status(200).send({excavacion: excavacionUpdate})
    
    })
}

function deleteExcavacion(req,res){
    let excavacionId = req.params.excavacionId
	
	Excavacion.findByIdAndRemove(excavacionId, (err, excavacion) => {
		// As always, handle any potential errors:
		if (err) return res.status(500).send(err);
		// We'll create a simple object to send back with a message and the id of the document that was removed
		// You can really do this however you want, though.
		const response = {
			message: "Excavacion satisfactoriamente borrada",
			id: excavacion._id
		};
		return res.status(200).send(response);
	});

}

function getExcavacionesFiltro(req, res){
   let codigo = req.params.unCodigo
   let nombre = req.params.unNombre
 
   
   
		Excavacion.find({ 'codigo':codigo,'nombre':nombre}, (err,excavacion)=>{
			if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
			if(!excavacion) return res.status(404).send({message:`La excavacion no existe buscada`})
			res.status(200).send({excavaciones: excavacion})
		})
   
}

function getExcavacionesFiltroCode(req, res){
   let codigo = req.params.unCodigo
  
		Excavacion.find({ 'codigo':codigo}, (err,excavacion)=>{
			if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
			if(!excavacion) return res.status(404).send({message:`La excavacion no existe buscada`})
			res.status(200).send({excavaciones: excavacion})
		})
   
}

function getExcavacionesFiltroName(req, res){
   let nombre = req.params.unNombre
  
		Excavacion.find({ 'nombre':nombre}, (err,excavacion)=>{
			if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
			if(!excavacion) return res.status(404).send({message:`La excavacion no existe buscada`})
			res.status(200).send({excavaciones: excavacion})
		})
   
}

const crearExcavacion = (req, res) => servicioExcavacion.crearExcavacion(req, res);

const modificarExcavacion = (req, res) => servicioExcavacion.modificarExcavacion(req, res);

const modificarAreaExcavacion = (req, res) => servicioExcavacion.modificarAreaExcavacion(req, res);

const borrarExcavaciones = (req, res) => servicioExcavacion.borrarExcavaciones(req, res);

module.exports = {
    getExcavaciones,
    getExcavacionNombre,
    getExcavacionesHome,
    getExcavacionesDirector,
    getExcavacionesPaleontologo,
    getExcavacionesColector,
    crearExcavacion,
    getExcavacion,
    modificarExcavacion,
	saveExcavacion,
	getExcavacionId,
	updateExcavacion,
	deleteExcavacion,
	getExcavacionesFiltro,
	getExcavacionesFiltroCode,
	getExcavacionesFiltroName,
    getAreaExcavacion,
    modificarAreaExcavacion,
    borrarExcavaciones,
};
