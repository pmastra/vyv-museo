'use strict'

const Persona = require('../models/persona')

function getPersonaId(req, res) { // busca una persona por su ID - clave mongo
    let personaId = req.params.personaId
    Persona.findById(personaId, (err,personaId)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!personaId) return res.status(404).send({message:`La persona no existe`})
        res.status(200).send({personaId: personaId})
    })
}

function getPersonaDni(req, res) { // busca una persona por DNI
    let persona = req.params.personaId
    Persona.findOne({'dni':persona}, (err,persona)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!persona) return res.status(404).send({message:`La persona no existe buscada`})
        res.status(200).send({persona: persona})
    })
}

function getPersonas(req, res){
    Persona.find({},(err,personas)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!personas) return res.status(404).send({message:`No existen personas`})
        res.status(200).send({personas: personas})
    })
}

function savePersona(req,res){
  //  console.log(req.body)
      
    let persona = new Persona()
    persona.nombres = req.body.nombres
    persona.apellidos = req.body.apellidos
    persona.dni = req.body.dni
    persona.fechaInicio = req.body.fechaInicio
    persona.titulos = req.body.titulos
    persona.foto = req.body.foto
    persona.fechaBaja = req.body.fechaBaja
    persona.motivoBaja = req.body.motivoBaja

    persona.save((err,personaStored)=> {
        if(err) res.status(500).send({message:`Error al salvar en la Base de Datos:${err}`})
        res.status(200).send({persona: personaStored})
    })
}

function deletePersona(req,res){
    let personaId = req.params.personaId
	
	Persona.findByIdAndRemove(personaId, (err, persona) => {
		// As always, handle any potential errors:
		if (err) return res.status(500).send(err);
		// We'll create a simple object to send back with a message and the id of the document that was removed
		// You can really do this however you want, though.
		const response = {
			message: "Persona satisfactoriamente borrada",
			id: persona._id
		};
		return res.status(200).send(response);
	});

}

function updatePersona(req,res){
    let personaId= req.params.personaId
    let update= req.body
  
    Persona.findByIdAndUpdate(personaId, update, (err, personaUpdate)=>{
        if(err) return  res.status(500).send({message: `Error al tratar de actualizar: ${err}`})
        if(!personaUpdate) return res.status(404).send({message:`La persona Update no Existe`})
        res.status(200).send({persona: personaUpdate})
    
    })
}

function getPersonasFiltro(req, res){
   let dni = req.params.unDni
   let nombre = req.params.unNombre
   let apellido = req.params.unApellido
   
   
		Persona.find({ 'dni':dni,'nombres':nombre,'apellidos':apellido}, (err,persona)=>{
			if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
			if(!persona) return res.status(404).send({message:`La persona no existe buscada`})
			res.status(200).send({personas: persona})
		})
   
	
	
	
	
}


function getPersonaNroDoc(req, res) { // busca una persona por DNI
    let persona = req.params.personaId
    Persona.find({'dni':persona}, (err,persona)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!persona) return res.status(404).send({message:`La persona no existe buscada`})
        res.status(200).send({personas: persona})
    })
}

function getPersonaName(req, res) { // busca una persona por DNI
    let persona = req.params.personaId
    Persona.find({'nombres':persona}, (err,persona)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!persona) return res.status(404).send({message:`La persona no existe buscada`})
        res.status(200).send({personas: persona})
    })
}

function getPersonaApellido(req, res) { // busca una persona por DNI
    let persona = req.params.personaId
    Persona.find({'apellidos':persona}, (err,persona)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!persona) return res.status(404).send({message:`La persona no existe buscada`})
        res.status(200).send({personas: persona})
    })
}

function getPersonaNombreApellido(req, res){
   let nombre = req.params.unNombre
   let apellido = req.params.unApellido
   
   
		Persona.find({ 'nombres':nombre,'apellidos':apellido}, (err,persona)=>{
			if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
			if(!persona) return res.status(404).send({message:`La persona no existe buscada`})
			res.status(200).send({personas: persona})
		})

}


function getPersonaNombreDNI(req, res){
   let dni = req.params.unDni
   let nombre = req.params.unNombre
  
   
		Persona.find({ 'dni':dni,'nombres':nombre}, (err,persona)=>{
			if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
			if(!persona) return res.status(404).send({message:`La persona no existe buscada`})
			res.status(200).send({personas: persona})
		})
	
}

function getPersonaApellidoDNI(req, res){
   let dni = req.params.unDni
   let apellido = req.params.unApellido
   
   
		Persona.find({ 'dni':dni,'apellidos':apellido}, (err,persona)=>{
			if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
			if(!persona) return res.status(404).send({message:`La persona no existe buscada`})
			res.status(200).send({personas: persona})
		})	
}



module.exports ={
    getPersonaId,
    getPersonaDni,
    getPersonas,
    savePersona,
	deletePersona,
	updatePersona,
	getPersonasFiltro,
	getPersonaNroDoc,
	getPersonaName,
	getPersonaApellido,
	getPersonaNombreApellido,
	getPersonaNombreDNI,
	getPersonaApellidoDNI
	
}