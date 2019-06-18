process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Persona = require('../models/persona');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let index = require('../index');
let should = chai.should();

chai.use(chaiHttp);
describe('Persona', () => {


 /*   beforeEach((done) => {
        Persona.remove({}, (err) => {
            done();
        });
    });
*/
    describe('/GET personas', () => {
        it('Esto deberia retornar todas las Personas', (done) => {
            chai.request(index)
                .get('/api/persona')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.personas.should.be.a('array');
                    res.body.personas.length.should.be.eql(0);
                done();
                });
        });
    });

    describe('/POST persona', () => {
        it('Esto deberia retornar la Persona insertada', (done) => {
            chai.request(index)
                .get('/api/persona')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.personas.should.be.a('array');
                    res.body.personas.length.should.be.eql(0);
                done();
                });
        });
    });



});
