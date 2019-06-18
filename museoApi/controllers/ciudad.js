'use strict'

const Ciudades = require('../models/Ciudad')


function getCiudades(req, res){
    Ciudades.find({},(err,ciudades)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!ciudades) return res.status(404).send({message:`No existen ciudades`})
        res.status(200).send({ciudades: ciudades})
    })
}

function getCiudadIdProv(req, res){
   
   let idProvincia = req.params.provId

   
   	Ciudades.find({ 'idProvincia.type':idProvincia}, (err,ciudad)=>{
			if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
			if(!ciudad) return res.status(404).send({message:`La ciudad buscada no existe`})
			res.status(200).send({ciudades: ciudad})
		})
   
}

module.exports ={
    getCiudades,
	getCiudadIdProv
}