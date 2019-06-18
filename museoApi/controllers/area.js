'use strict';
const servicioArea = require('../services/area');

const crearArea = (req,res) => servicioArea.crearArea(req,res);

const obtenerArea = (req, res) => servicioArea.obtenerArea(req, res)

const modificarArea = (req,res) => servicioArea.modificarArea(req, res);

const eliminarArea = (req,res) => servicioArea.eliminarArea(req, res);

module.exports = {
    crearArea,
    obtenerArea,
    modificarArea,
    eliminarArea,
};
