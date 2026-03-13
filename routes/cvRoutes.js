const express = require('express');
const router = express.Router();
const { getPersonaje } = require('../controllers/cvController');

// Ruta para obtener el personaje
router.get('/personaje', getPersonaje);

// Ruta de prueba
router.get('/ping', (req, res) => {
  res.json({ mensaje: 'pong' });
});

module.exports = router;
