'use strict'

const Bochon = require('../models/bochon')

function getbochonId(req, res) { // busca un bochon por su ID - clave mongo
    let bochonId = req.params.bochonId
    Bochon.findById(bochonId, (err,bochonId)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!bochonId) return res.status(404).send({message:`El bochon no existe`})
        res.status(200).send({bochonId: bochonId})
    })
}

function getbochonCampo(req, res) { // busca un bochon por nro de campo
    let bochon = req.params.bochonId
    Bochon.find({'nroCampo':bochon}, (err,bochon)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!bochon) return res.status(404).send({message:`El bochon no existe buscada`})
        res.status(200).send({bochon: bochon})
    })
}


function getbochones(req, res){
    Bochon.find({},(err,bochones)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!bochones) return res.status(404).send({message:`No existen bochones`})
        res.status(200).send({bochones: bochones})
    })
}

function getbochonEjemplar(req, res) { // busca un bochon por su ejemplar Asociado
    let ejemAsociado = req.params.bochonId
    Bochon.find({'ejemplarAsociado':ejemAsociado}, (err,bochon)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!bochon) return res.status(404).send({message:`El bochon no existe buscada`})
        res.status(200).send({bochon: bochon})
    })
}

function saveBochon(req,res){
    console.log('POST /api/bochon')
    console.log(req.body)
      
    let bochon = new Bochon()
    bochon.nombre = req.body.nombre
    bochon.nroCampo = req.body.nroCampo
    bochon.preparador = req.body.preparador
    bochon.preparadorId = req.body.preparadorId
    bochon.tipoPreparacion = req.body.tipoPreparacion
    bochon.acidosAplicados = req.body.acidosAplicados
    bochon.ejemplaresAsociados = req.body.ejemplaresAsociados
    bochon.excavacionId = req.body.excavacionId
    bochon.piezaId = req.body.piezaId

    bochon.save((err,bochonStored)=> {
        if(err) res.status(500).send({message:`Error al salvar en la Base de Datos:${err}`})
        res.status(200).send({bochon: bochonStored})
    })
}

module.exports ={
    getbochones,
    getbochonCampo,
    getbochonId,
    getbochonEjemplar,
    saveBochon
}