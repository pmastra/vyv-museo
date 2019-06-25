'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')
var server;

mongoose.set('useFindAndModify', false);



module.exports =  app.listen(config.port, ()=> {
    console.log('API REST corriendo en: '+ config.db +' puerto: ' + config.port)
    mongoose.connect(config.db, (err) => {
        if(err) throw err
        console.log('Conexión a la base de datos establecida...')
    
       
    })
})


