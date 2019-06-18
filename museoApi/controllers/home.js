'use strict'

const Home = require('../models/home')

function getHome(req, res){
    Home.find({},(err,home)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!home) return res.status(404).send({message:`No existe home`})
        res.status(200).send({home: home})
    })
}

module.exports ={
    getHome
}