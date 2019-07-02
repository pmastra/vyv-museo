process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Persona = require('../models/persona');
let Excavacion = require('../models/excavacion');
let Area = require('../models/area');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let servidor = require('../index');
let should = chai.should();

chai.use(chaiHttp);


describe ('GET Excavacion' , () => {
    it('Deberia retornarnos un 200 mas todas las excavaciones que se encuentren', (done) => {
        chai.request(servidor)
            .get('/api/excavacion')
            //.send(excavacion.idExcavacion)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.Excavacion.should.have.property('_id');
                done();
            });
    });
});
describe('GET Excavacion por id', () => {

    //before((done) => {
    //    Exploracion.deleteMany({}, (err) => {
    //    });

    //    const exploracionCtrl = require ('../controllers/exploracion')
    //    exploracionCtrl.crearAreaExploracion;

    //    done();

    //});

    it('Id correcta, deberia retornarnos un 200 mas su id de mongo', (done) => {
        let excavacion = {
            idExcavacion: "5d1bafa0c85fe83854f6a667"
        }
        chai.request(servidor)
            .get('/api/excavacionId/5d1bafa0c85fe83854f6a667')
            //.send(excavacion.idExcavacion)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.Excavacion.should.have.property('_id');
                done();
            });
    });
    it('Id incorrecta, deberia retornar un 404', (done) => {
        let excavacion = {
            idExcavacion: "5d129ea9bacbe8218449f4b6"
        }
        chai.request(servidor)
            .get('/api/excavacionId/5d129ea9bacbe8218449f4b9')
            //.send(excavacion.idExcavacion)
            .end((err, res) => {
                res.should.have.status(404);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.Excavacion.should.have.property('_id');
                done();
            });
    });
    it('Id incorrecta fuera del rago de mongo, deberia capturarnos la excepcion', (done) => {
        let excavacion = {
            idExcavacion: "5d129ea9bacbe8218449f4b6"
        }
        chai.request(servidor)
            .get('/api/excavacionId/5d129ea9bacbe8218449f4b9')
            //.send(excavacion.idExcavacion)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.Excavacion.should.have.property('_id');
                done();
            });
    });

});

describe('POST Excavacion', () =>{
    it('Esto deberia retornar un status 200 insertando una excavacion junto con su id de mongo', (done) =>{
        let excavacion = {
            exploracionId: "5d1793efc3a46a258cc31a1c"
        }
        chai.request(servidor)
            .post('/api/areaExcavacion')
            .send(excavacion)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.Excavacion.should.have.property('_id');
                done();
        });
    });
    it('Esto deberia retornar un status 500 insertando una excavacion sin un id de exploracion correcto', (done) =>{
        let excavacion = {
            exploracionId: "5d129572161e811c34107251" //id de exploracion inexistente
        }
        chai.request(servidor)
            .post('/api/areaExcavacion')
            .send(excavacion)
            .end((err, res) => {
                res.should.have.status(500);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.Excavacion.should.have.property('_id');
                done();
        });
    });
    it('Esto deberia retornar un status 500 insertando una excavacion sin un id de exploracion', (done) =>{
        chai.request(servidor)
            .post('/api/areaExcavacion')
            .send()
            .end((err, res) => {
                res.should.have.status(500);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.Excavacion.should.have.property('_id');
                done();
        });
    });
    it('Esto deberia retornar un status 500 insertando una excavacion sin un id de mongo correcto', (done) =>{
        let excavacion = {
            exploracionId: "5d129572161e811c3410725r" //id de exploracion incorrecto para mongo, nos vamos del limite
        }
        chai.request(servidor)
            .post('/api/areaExcavacion')
            .send(excavacion)
            .end((err, res) => {
                res.should.have.status(500);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.Excavacion.should.have.property('_id');
                done();
        });
    });   
});

describe('DELETE excavacion',()=>{
    it('Deberia retornar (200) al borrar todas las excavaciones', (done) => {
        chai.request(servidor)
        .delete('/api/areaExcavacion')
        .end((err, res) => {
            res.should.have.status(500);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.Excavacion.should.have.property('_id');
            done();
         });
    });
});