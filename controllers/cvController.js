const { personaje } = require('../models/cvModel');

// Controlador para obtener el personaje
function getPersonaje(req, res) {
  console.log('Solicitud recibida en /api/personaje');
  res.json(personaje);
}

module.exports = { getPersonaje };
