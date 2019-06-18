'use strict'

const Paises = require('../models/Pais')


function getPaises(req, res){
    Paises.find({},(err,paises)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!paises) return res.status(404).send({message:`No existen paises`})
        res.status(200).send({paises: paises})
    })
}

module.exports ={
    getPaises
}