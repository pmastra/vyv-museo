'use strict'

const Provincias = require('../models/Provincia')


function getProvincias(req, res){
    Provincias.find({},(err,provincias)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!provincias) return res.status(404).send({message:`No existen provincicas`})
        res.status(200).send({provincias: provincias})
    })
}

function getProvinciaIdPais(req, res){
   
   let idPais = req.params.paisId

   
   	Provincias.find({ 'idPais.type':idPais}, (err,provincia)=>{
			if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
			if(!provincia) return res.status(404).send({message:`La provincia buscada no existe`})
			res.status(200).send({provincias: provincia})
		})
   
}

module.exports ={
    getProvincias,
	getProvinciaIdPais
}