process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Persona = require('../models/persona');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let servidor = require('../index');
let should = chai.should();

chai.use(chaiHttp);


describe('Persona', () => {

    before((done) => {
        Persona.deleteMany({}, (err) => {
        });

        let persona = new Persona()
        persona.nombres = "Moni";
        persona.apellidos = "Argento";
        persona.dni = "11111111";
        persona.fechaInicio = "2010-10-10";
        persona.foto ="hola";

        persona.save((err,personaStored)=> {
        })

        done();

    });


  





describe ('POST',()=>{
    it('Esto deberia retornar la Persona insertada junto con su _id de mongo /POST personas 222', (done) => {
        chai.request(servidor)
            .post('/api/persona')
            .send(
                {
                    "nombres":"Pepe",
                    "apellidos":"Argento",
                    "dni":"12345678",
                    "fechaInicio": "2010-10-10",
                    "foto":"hola"
                }
                )
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.persona.should.have.property('_id');
                done();
            });
    });

    it('No deberia dejar insertar una persona vacia /POST personas', (done) => {
        chai.request(servidor)
            .post('/api/persona')
            .send({})
            .end((err, res) => {
                res.should.have.status(500);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();
            });
    });
/*
    it('No deberia dejar insertar un DNI que no sea numerico /POST personas', (done) => {
        chai.request(servidor)
            .post('/api/persona')
            .send({
                "nombres":"facu2",
                "apellidos":"paterno2",
                "dni":"HOLA SOY UN DNI",
                "fechaInicio": "2010-10-10",
                "foto":"hola"
            })
            .end((err, res) => {
                res.should.have.status(500);
                res.should.be.json;
                res.body.should.be.a('object');
                // res.body.persona.dni.should.be.a('number');
                res.body.should.have.property('message');
            done();
            });
    });
*/
    it('No deberia dejar dar de alta a 2 personas con DNI igual /POST personas', function(done) {
        var dni='38491676'
        chai.request(servidor)
            .post('/api/persona')
            .send(
            {
                "nombres":"facu1",
                "apellidos":"paterno1",
                "dni":dni,
                "fechaInicio": "2010-10-10",
                "foto":"hola"
            }
            )
            .end(function(err, res){
            chai.request(servidor)
                .post('/api/persona')
                .send(
                {
                    "nombres":"facu2",
                    "apellidos":"paterno2",
                    "dni":dni,
                    "fechaInicio": "2010-10-10",
                    "foto":"hola"
                }
                )
                .end(function(error, res){
                    res.should.have.status(500);
                    
                    done();
                });
            });
        });

    

});
    








describe('PUT', ()=>{
    it('Se deberia actualizar los datos de una Persona /PUT personas', (done) => {
        var personaId='12345678'
        var nuevoNombre="Pepe2"
        var nuevoApellido="Argento2"
        chai.request(servidor)
            .get('/api/personaDni/'+personaId)
            .end((err, res) => {

                var personaId=res.body.persona._id;

                chai.request(servidor)
                    .put('/api/persona/'+personaId)
                    .send({
                        "nombres":nuevoNombre,
                        "apellidos":nuevoApellido,
                        
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.persona.should.have.property('_id');
                        done();
                    });           
            });
    });

    it('Deberia dar error (500) al cambiar _id (pkey) por uno igual, ya existente /PUT personas', (done) => {
        var personaDni1='12345678';
        var personaDni2='11111111';

        chai.request(servidor)
            .get('/api/personaDni/'+personaDni1)//Obtengo el primer _id
            .end((err, res) => {

                var personaId1=res.body.persona._id;

                chai.request(servidor)
                .get('/api/personaDni/'+personaDni2)//Obtengo el segundo _id
                .end((err, res) => {
                    var personaId2=res.body.persona._id;

                    chai.request(servidor)
                    .put('/api/persona/'+personaId1)//Hago el cambio de _id
                    .send({
                        "_id":personaId2
                    })
                    .end((err, res) => {
                        res.should.have.status(500);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('message');
                    });           
                 done();
                });

                
            });
    });
})


 
describe('GET',()=>{
    it('Esto deberia retornar todas las Personas (200) /GET personas', (done) => {
        chai.request(servidor)
            .get('/api/persona')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.personas.should.be.a('array');

            done();
            });
    });

    it('Esto deberia retornar una Persona (200) si encuentra por su dni /GET personas', (done) => {

        var personaDni=12345678;//DNI

        chai.request(servidor)
            .get('/api/personaDni/'+personaDni)
            .end((err, res) => {

                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.persona.should.have.property('_id');
                res.body.persona.should.have.property('dni');
                res.body.persona.dni.should.be.eql(personaDni);
                
                done();
            });
    });

    it('Esto deberia retornar una Persona existente (200) si encuentra por su _id Mongo /GET personas', (done) => {

        var personaDni=12345678;//DNI

        chai.request(servidor)
            .get('/api/personaDni/'+personaDni)
            .end((err, res) => {

                var personaId=res.body.persona._id;

                chai.request(servidor)
                    .get('/api/personaId/'+personaId)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.personaId.should.have.property('_id');
                        res.body.personaId._id.should.be.eql(personaId);
                        done();
                    });           
               
            });
    });

    it('Esto deberia retornar (404) si una Persona no existe por su _id Mongo /GET personas', (done) => {

        var personaId=1234000;

        chai.request(servidor)
            .get('/api/personaId/'+personaId)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property('message');

                done();

            });           
    });

    it('Esto NO deberia retornar una Persona (500) si se reciben parametros incorrectos /GET personas', (done) => {

        var personaId='SOY UN ID INCORRECTO';

        chai.request(servidor)
            .get('/api/personaId/'+personaId)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.have.property('message');

                done();

            });           
    });


    it('Deberia retornar UNA (200) Persona que coincida con los Filtros /GET personas', (done) => {

        var dni=11111111;
        var nombres='Moni';
        var apellidos='Argento';
        chai.request(servidor)
            .get('/api/personasFiltro/'+dni+'&'+nombres+'&'+apellidos)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.personas[0].should.have.property('_id');
                res.body.personas.length.should.be.eql(1)
                done();

            });           
    });

    it('Deberia retornar al menos UNA (200) Persona que coincida con los Filtros /GET personas', (done) => {
        var dni='';
        var nombres='Moni';
        var apellidos='Argento';
        chai.request(servidor)
            .get('/api/personasFiltro/'+dni+'&'+nombres+'&'+apellidos)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.personas[0].should.have.property('_id');
                done();

            });           
    });

    it('Deberia retornar CERO (404) Personas ya que no coinciden con Filtros /GET personas', (done) => {

        var dni=00000000;
        var nombres='No';
        var apellidos='Existo';
        chai.request(servidor)
            .get('/api/personasFiltro/'+dni+'&'+nombres+'&'+apellidos)
            .end((err, res) => {
                res.should.have.status(404);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();

            });           
    });

    it('Deberia retornar ERROR (500) Personas ya que los Filtros son Vacios /GET personas', (done) => {

        var dni='';
        var nombres='';
        var apellidos='';
        chai.request(servidor)
            .get('/api/personasFiltro/'+dni+'&'+nombres+'&'+apellidos)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();

            });           
    });

    it('Deberia retornar ERROR (500) Personas ya que los Filtros son Undefined /GET personas', (done) => {

        var dni;
        var nombres;
        var apellidos;
        chai.request(servidor)
            .get('/api/personasFiltro/'+dni+'&'+nombres+'&'+apellidos)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();

            });           
    });

    it('Deberia retornar Error (500) ya que los parametros son incorrectos /GET personas', (done) => {

        var dni='SOY UN DNI MALO';
        var nombres='No';
        var apellidos='Existo';
        chai.request(servidor)
            .get('/api/personasFiltro/'+dni+'&'+nombres+'&'+apellidos)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.have.property('message');

                done();

            });           
    });



    it('Esto deberia retornar el nombre de Persona existente (200) si encuentra por su _id Mongo /GET personas', (done) => {

        var personaDni=12345678;//DNI

        chai.request(servidor)
            .get('/api/personaDni/'+personaDni)
            .end((err, res) => {

                var personaId=res.body.persona._id;

                chai.request(servidor)
                    .get('/api/personaName/'+personaId)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.personas.should.have.property('nombres');
                        done();

                    });           
            });
    });

    it('Esto deberia retornar Error (404) si NO encuentra el nombre de una Persona por su _id Mongo /GET personas', (done) => {

        var personaId=55555555;

        chai.request(servidor)
            .get('/api/personaName/'+personaId)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();

            });           
    });

    it('Esto deberia retornar Error (500) si el _id Mongo es erroneo para obtener el nombre de una Persona /GET personas', (done) => {

        var personaId;

        chai.request(servidor)
            .get('/api/personaName/'+personaId)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();

            });           
    });

    it('[Leer comentarios - NO PASA] Esto deberia retornar el Apellido de Persona existente (200) si encuentra por su _id Mongo /GET personas', (done) => {

        var personaDni=12345678;//DNI

        chai.request(servidor)
            .get('/api/personaDni/'+personaDni)
            .end((err, res) => {

                var personaId=res.body.persona._id;
                chai.request(servidor)
                    .get('/api/personaApellido/'+personaId)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        done();

                    });           
            });
    });

    it('Esto deberia retornar Error (404) si NO encuentra el Apellido de una Persona por su _id Mongo /GET personas', (done) => {

        var personaId=55555555;

        chai.request(servidor)
            .get('/api/personaApellido/'+personaId)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();

            });           
    });

    it('Esto deberia retornar Error (500) si el _id Mongo es erroneo para obtener el Apellido de una Persona /GET personas', (done) => {

        var personaId;

        chai.request(servidor)
            .get('/api/personaApellido/'+personaId)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();
            });           
    });



    it('Deberia retornar UNA (200) Persona que coincida con el Nombre y Apellido /GET personas', (done) => {

        var nombres='Moni';
        var apellidos='Argento';
        chai.request(servidor)
            .get('/api/personaNombreApellido/'+nombres+'&'+apellidos)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.personas[0].should.have.property('_id');
                res.body.personas.length.should.be.eql(1)
                done();

            });           
    });


    it('Deberia retornar CERO (404) Personas ya que no coinciden con el Nombre y Apellido /GET personas', (done) => {

        var nombres='No';
        var apellidos='Existo';
        chai.request(servidor)
            .get('/api/personaNombreApellido/'+nombres+'&'+apellidos)
            .end((err, res) => {
                res.should.have.status(404);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();

            });           
    });

    it('Deberia retornar CERO (404) Personas ya que el Nombre y Apellido son Vacios /GET personas', (done) => {

        var nombres='';
        var apellidos='';
        chai.request(servidor)
            .get('/api/personaNombreApellido/'+nombres+'&'+apellidos)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();

            });           
    });

    it('Deberia retornar ERROR (500) Personas ya que el Nombre y Apellido son Undefined /GET personas', (done) => {

        var nombres;
        var apellidos;
        chai.request(servidor)
            .get('/api/personaNombreApellido/'+nombres+'&'+apellidos)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();

            });           
    });

    it('Deberia retornar una Persona (200) ya que el Nombre y DNI existen /GET personas', (done) => {

        var dni=38491676;
        var nombres='facu1';

        chai.request(servidor)
            .get('/api/personaNombreDNI/'+nombres+'&'+dni)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.personas[0].should.have.property('_id');
                res.body.personas.length.should.be.eql(1)
                done();

            });           
    });

    it('Deberia retornar una ERROR (500) ya que el Nombre y DNI son undefined /GET personas', (done) => {

        var dni;
        var nombres;

        chai.request(servidor)
            .get('/api/personaNombreDNI/'+nombres+'&'+dni)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();

            });           
    });

    it('Deberia retornar una ERROR (404) ya que el Nombre y DNI no existen /GET personas', (done) => {

        var dni=923193219;
        var nombres='NO EXISTO';

        chai.request(servidor)
            .get('/api/personaNombreDNI/'+nombres+'&'+dni)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();

            });           
    });

    it('Deberia retornar una Persona (200) ya que el Apellido y DNI existen /GET personas', (done) => {

        var dni=38491676;
        var apellidos='paterno2';

        chai.request(servidor)
            .get('/api/personaApellidoDNI/'+apellidos+'&'+dni)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.personas[0].should.have.property('_id');
                res.body.personas.length.should.be.eql(1)
                done();

            });           
    });

    it('Deberia retornar un ERROR (500) ya que el Apellido y DNI son undefined /GET personas', (done) => {

        var dni;
        var apellidos;

        chai.request(servidor)
            .get('/api/personaApellidoDNI/'+apellidos+'&'+dni)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();

            });           
    });

    it('Deberia retornar un ERROR (404) ya que el Apellido y DNI no existen /GET personas', (done) => {

        var dni=9478292;
        var apellidos='NO EXISTO';

        chai.request(servidor)
            .get('/api/personaApellidoDNI/'+apellidos+'&'+dni)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();

            });           
    });

})



describe('DELETE',()=>{
    it('Deberia retornar (200) al borrar una Persona existente /DELETE personas', (done) => {
        var personaDni=12345678;//DNI

        chai.request(servidor)
        .get('/api/personaDni/'+personaDni)
        .end((err, res) => {

            var personaId=res.body.persona._id;
            chai.request(servidor)
                .delete('/api/persona/'+personaId)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    console.log(res.body)
                    res.body.should.have.property('message');
                    

                    done();

                });           
        });         
    });

    it('Deberia retornar (404) al borrar una Persona que NO existe /DELETE personas', (done) => {

        var personaId=88888888;
        chai.request(servidor)
            .delete('/api/persona/'+personaId)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();

            });           
    });


    it('Deberia retornar (500) al recibir un _id mongo erroneo (undefined) /DELETE personas', (done) => {

        var personaId;
        chai.request(servidor)
            .delete('/api/persona/'+personaId)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();

            });           
    });
})




});//Fin tests para persona
