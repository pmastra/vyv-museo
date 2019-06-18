'use strict'

const Ejemplar = require('../models/ejemplar')

function getejemplarId(req, res) { // busca un ejemplar por su ID - clave mongo
    let ejemplarId = req.params.ejemplarId
    Ejemplar.findById(ejemplarId, (err,ejemplarId)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!ejemplarId) return res.status(404).send({message:`El bochon no existe`})
        res.status(200).send({ejemplarId: ejemplarId})
    })
}

function getejemplarNroColeccion(req, res) { // busca un ejemplar por nro de coleccion
    let ejemplar = req.params.ejemplarId
    Ejemplar.findOne({'nroColeccion':ejemplar}, (err,ejemplar)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!ejemplar) return res.status(404).send({message:`El ejemplar no existe buscada`})
        res.status(200).send({ejemplar: ejemplar})
    })
}

function getejemplarExca(req, res) { // busca los ejemplares que pertenecen a una excavación
    let ejemplar = req.params.ejemplarId
    Ejemplar.find({'perteneceExca':ejemplar}, (err,ejemplar)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!ejemplar) return res.status(404).send({message:`No hay ejemplares para la excavacion`})
        res.status(200).send({ejemplar: ejemplar})
    })
}

function getejemplares(req, res){
    Ejemplar.find({},(err,ejemplares)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!ejemplares) return res.status(404).send({message:`No existen ejemplares`})
        res.status(200).send({ejemplares: ejemplares})
    })
}

function getejemplarHome(req, res) { // busca un ejemplar a mostrar en el home segun ubicacion
    let homeUbicacion = req.params.ejemplarId
    Ejemplar.find({'home':homeUbicacion}, (err,ejemplar)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!ejemplar) return res.status(404).send({message:`El ejemplar no existe buscada`})
        res.status(200).send({ejemplar: ejemplar})
    })
}

function saveEjemplar(req,res){
    console.log('POST /api/ejemplar')
    console.log(req.body)
      
    let ejemplar = new Ejemplar()
    ejemplar.tipoEjemplar = req.body.tipoEjemplar
    ejemplar.taxonReino = req.body.taxonReino
    ejemplar.taxonFilo = req.body.taxonFilo
    ejemplar.taxonClase = req.body.taxonClase
    ejemplar.taxonOrden = req.body.taxonOrden
    ejemplar.taxonFamilia = req.body.taxonFamilia
    ejemplar.taxonGenero = req.body.taxonGenero
    ejemplar.taxonEspecie = req.body.taxonEspecie
    ejemplar.eraGeologica = req.body.eraGeologica
    ejemplar.ilustracionCompleta = req.body.ilustracionCompleta
    ejemplar.areaHallazgo = req.body.areaHallazgo
    ejemplar.nroColeccion = req.body.nroColeccion
    ejemplar.dimensionLargo = req.body.dimensionLargo
    ejemplar.dimensionAlto = req.body.dimensionAlto
    ejemplar.peso = req.body.peso
    ejemplar.alimentacion = req.body.alimentacion
    ejemplar.fechaIngresoColeccion = req.body.fechaIngresoColeccion
    ejemplar.ubicacionMuseo = req.body.ubicacionMuseo
    ejemplar.fechaBaja = req.body.fechaBaja
    ejemplar.motivoBaja = req.body.motivoBaja
    ejemplar.nombre = req.body.nombre
    ejemplar.periodo = req.body.periodo
    ejemplar.fotosEjemplar = req.body.fotosEjemplar
    ejemplar.videosEjemplar = req.body.videosEjemplar
    ejemplar.home=req.body.home
    ejemplar.descripcion1=req.body.descripcion1
    ejemplar.descripcion1A=req.body.descripcion1A
    ejemplar.descripcion2=req.body.descripcion2
    ejemplar.descripcion3=req.body.descripcion3
    ejemplar.perteneceExca=req.body.perteneceExca
    
    ejemplar.save((err,ejemplarStrored)=> {
        if(err) res.status(500).send({message:`Error al salvar en la Base de Datos:${err}`})
        res.status(200).send({ejemplar: ejemplarStrored})
    })
}

module.exports ={
   getejemplarNroColeccion,
   getejemplares,
   getejemplarId,
   getejemplarHome,
   getejemplarExca,
   saveEjemplar
}