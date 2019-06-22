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

/*    beforeEach((done) => {
        Persona.remove({}, (err) => {
            done();
        });
    });
*/

    after(function() {
        servidor.close();
    });






describe('/POST personas', () => {

            it('Esto deberia retornar la Persona insertada junto con si _id de mongo', (done) => {
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

            it('No deberia dejar insertar una persona vacia', (done) => {
                chai.request(servidor)
                    .post('/api/persona')
                    .send({})
                    .end((err, res) => {
                        res.should.have.status(500);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        response.body.should.have.property('message');
                    done();
                    });
            });

            it('No deberia dejar insertar un DNI que no sea numerico', (done) => {
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
                        response.body.should.have.property('message');
                    done();
                    });
            });

            it('No deberia dejar dar de alta a 2 personas con DNI igual', function(done) {
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
                      .end(function(error, response){
                        response.should.have.status(500);
                       
                        done();
                    });
                  });
              });

    
});



describe('/PUT personas', () => {
    it('Se deberia actualizar los datos de una Persona', (done) => {
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
                        "dni":"12345678",
                        "fechaInicio": "2010-10-10",
                        "foto":"hola"
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.persona.should.have.property('_id');
                        res.body.persona.nombres.should.be.eql(nuevoNombre);
                        res.body.persona.apellidos.should.be.eql(nuevoApellido);

                    });           
                done();
            });
    });
});



describe('/GET personas', () => {
    it('Esto deberia retornar todas las Personas', (done) => {
        chai.request(servidor)
            .get('/api/persona')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.personas.should.be.a('array');

               // res.body.personas.length.should.be.eql(0);
            done();
            });
    });

    it('Esto deberia retornar una Persona si encuentra por su dni', (done) => {

        var personaId=12345678;//DNI

        chai.request(servidor)
            .get('/api/personaDni/'+personaId)
            .end((err, res) => {

                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.persona.should.have.property('_id');
                res.body.persona.should.have.property('dni');
                res.body.persona.dni.should.be.eql(personaId);
               // res.body.persona.length.should.be.isAtMost(1);
                
                done();
            });
    });

    it('Esto deberia retornar una Persona existente si encuentra por su _id Mongo', (done) => {

        var personaId=12345678;//DNI

        chai.request(servidor)
            .get('/api/personaDni/'+personaId)
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

                    });           
                done();
            });
    });

    it('Esto deberia retornar 404 si una Persona no existe por su _id Mongo', (done) => {

        var personaId=1234000;

        chai.request(servidor)
            .get('/api/personaId/'+personaId)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property('message');

                done();

            });           
    });

    it('Esto NO deberia retornar una Persona si se reciben parametros incorrectos', (done) => {

        var personaId='SOY UN PARAMETRO INCORRECTO';

        chai.request(servidor)
            .get('/api/personaId/'+personaId)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.have.property('message');

                done();

            });           
    });




}); 

});
