const Exploracion = require('../models/exploracion');
const Excavacion = require('../models/excavacion');
// const servicioExcavacion = require('./excavacion');
const servicioArea = require('./area');


getExcavacionById = excavacionId => {
  return Excavacion.findById(excavacionId)
  .then(excavacion => {
    let excavacionCompleta = {};
    Object.assign(excavacionCompleta, excavacion._doc);

    return servicioArea.getAreaById(excavacion.idArea)
    .then(area => {
      let areaExcavacion = {};
      Object.assign(areaExcavacion, area._doc);
      excavacionCompleta.areaExcavacion = areaExcavacion;

      return excavacionCompleta;
    });
  })
  .catch(err => Promise.reject(`Error al recuperar la excavacion: ${err}`));
}

getExploracionById = (req, res) => {
  return Exploracion.findById(req.params.exploracionId)
  .then(exploracion => {
    const exploracionCompleta = {};
    Object.assign(exploracionCompleta, exploracion._doc);

    servicioArea.getAreaById(exploracion.idArea)
    .then(area => {
      let areaExploracion = {};
      Object.assign(areaExploracion, area._doc);
      exploracionCompleta.areaExploracion = areaExploracion;

      const excavacionesCompletas = exploracion.idExcavaciones.map(excavacionId => getExcavacionById(excavacionId))
      Promise.all(excavacionesCompletas)
      .then(todas => {
        exploracionCompleta.excavaciones = todas;
        res.status(200).send({ exploracion: exploracionCompleta });
      })
    });
  })
  .catch(() => res.status(500).send({message:`Error al realizar la petición`}));
};

getExploraciones = (req, res) => {
  return Exploracion.find()
  .then(exploraciones => {
    const exploracionesCompletas = exploraciones.map(exploracion => {
      let exploracionCompleta = {};
      Object.assign(exploracionCompleta, exploracion._doc);

      return servicioArea.getAreaById(exploracion.idArea)
      .then(area => {
        let areaExploracion = {};
        Object.assign(areaExploracion, area._doc);
        exploracionCompleta.areaExploracion = areaExploracion;

        const excavacionesCompletas = exploracion.idExcavaciones.map(excavacionId => getExcavacionById(excavacionId))
        return Promise.all(excavacionesCompletas)
        .then(todas => {
          exploracionCompleta.excavaciones = todas;
          return exploracionCompleta;
        })
      });
    });

    Promise.all(exploracionesCompletas)
    .then(exploraciones => {
      res.status(200).send({ exploraciones });
    });
  })
  .catch(() => res.status(500).send({message:`Error al realizar la petición`}));
};

getExploracion = exploracionId => {
  return Exploracion.findById(exploracionId)
  .then(exploracion => {
    const exploracionCompleta = {};
    Object.assign(exploracionCompleta, exploracion._doc);

    return servicioArea.getAreaById(exploracion.idArea)
    .then(area => {
      let areaExploracion = {};
      Object.assign(areaExploracion, area._doc);
      exploracionCompleta.areaExploracion = areaExploracion;

      return exploracionCompleta;
    });
  })
  .catch(err => Promise.reject(`Error al recuperar la exploracion: ${err}`));
};

crearAreaExploracion = ({ puntos }) => {
  return servicioArea.crearArea({ puntos })
  .then(area => {
    const exploracion = new Exploracion({
      fecha: new Date(),
      idArea: area._id,
    });
    return exploracion.save();
  })
  .catch(() => new Error('Error al insertar el area de la exploracion en la Base de Datos'));
};

modificarAreaExploracion = (req, res) => {
  if (req.body.areaExploracion && req.params.exploracionId) {
    return getExploracion(req.params.exploracionId)
    .then(exploracion => {
      return servicioArea.getAreaById(exploracion.idArea)
      .then(areaExploracion => {
        servicioArea.modificarArea(areaExploracion._id, req.body.areaExploracion)
        .then(() => res.status(200).send({ message: 'Area de Exploracion correctamente modificada' }))
        .catch(() => res.status(500).send({ message: 'Error al modificar el Area de Exploracion' }));
      })
      .catch(error => Promise.reject(error));
    });
  };
  return Promise.resolve();
};

setearExcavacion = (exploracion, idExcavacion) => {
  let idExcavaciones = exploracion.idExcavaciones;
  idExcavaciones.push(idExcavacion);

  return Exploracion.update({ _id: exploracion._id }, { $set: { idExcavaciones }});
}

borrarExploraciones = () => Exploracion.remove();


module.exports = {
  crearAreaExploracion,
  getExploracionById,
  getExploraciones,
  getExploracion,
  modificarAreaExploracion,
  setearExcavacion,
  borrarExploraciones
};
  