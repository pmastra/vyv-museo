'use strict'

const Pieza = require('../models/pieza')

function getpiezaId(req, res) { // busca una pieza por su ID - clave mongo
    let piezaId = req.params.piezaId
    Pieza.findById(piezaId, (err,pieza)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!piezaId) return res.status(404).send({message:`La pieza no existe`})
        res.status(200).send({pieza: pieza})
    })
}

function getpiezaIdentificador(req, res) { // busca una pieza por su identificador
    let piezaIdentificador = req.params.piezaId
    Pieza.findOne({'identificador':piezaIdentificador}, (err,pieza)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!pieza) return res.status(404).send({message:`La pieza no existe buscada`})
        res.status(200).send({pieza: pieza})
    })
}

function getpiezaEjemplar(req, res) { // busca las piezas asociadas a un Ejemplar
    let idEjemplar = req.params.piezaId
    Pieza.find({'perteneceEjemplar':idEjemplar}, (err,pieza)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!pieza) return res.status(404).send({message:`No existen Piezas para el Ejemplar`})
        res.status(200).send({pieza: pieza})
    })
}

function getpiezas(req, res){
    Pieza.find({},(err,piezas)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!piezas) return res.status(404).send({message:`No existen piezas`})
        res.status(200).send({piezas: piezas})
    })
}

function savePieza(req,res){
    console.log('POST /api/pieza')
    console.log(req.body)
      
    let pieza = new Pieza()
    pieza.identificador = req.body.identificador
    pieza.tipoPieza = req.body.tipoPieza
    pieza.medidasPieza = req.body.medidasPieza
    pieza.imagenPieza = req.body.imagenPieza
    pieza.fechaIngreso = req.body.fechaIngreso
    pieza.fechaBaja = req.body.fechaBaja
    pieza.motivoBaja = req.body.motivoBaja
    pieza.perteneceEjemplar = req.body.perteneceEjemplar
    pieza.origen = req.body.origen
    
    pieza.save((err,piezaStored)=> {
        if(err) res.status(500).send({message:`Error al salvar en la Base de Datos:${err}`})
        res.status(200).send({pieza: piezaStored})
    })
}

module.exports ={
    getpiezas,
    getpiezaId,
    getpiezaIdentificador,
    getpiezaEjemplar,
    savePieza
}