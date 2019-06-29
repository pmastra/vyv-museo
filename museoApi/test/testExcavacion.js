process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Persona = require('../models/persona');
let Exploracion = require('../models/excavacion');
let Area = require('../models/area');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let servidor = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('GET Excavacion', () => {

    //before((done) => {
    //    Exploracion.deleteMany({}, (err) => {
    //    });

    //    const exploracionCtrl = require ('../controllers/exploracion')
    //    exploracionCtrl.crearAreaExploracion;

    //    done();

    //});

    it('Esto deberia retornar la Excavacion insertada junto con su _id de mongo /POST excavacion', (done) => {
        chai.request(servidor)
            .post('/api/areaExcavacion')
            .send(
                {       }
                )
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.persona.should.have.property('_id');
                done();
            });
    });

});