const router = require('express').Router();
const {
  crearPlaylist,
  obtenerPlaylists,
  modificarPlaylist,
  eliminarPlaylist
} = require('../controllers/playlists')
var auth = require('./auth');

router.get('/', auth.opcional,obtenerPlaylist)
router.get('/:id', auth.opcional, obtenerPlaylist)
router.post('/', auth.requerido, crearPlaylist)
router.put('/:id',auth.requerido, modificarPlaylist)
router.delete('/:id',auth.requerido, eliminarPlaylist)

module.exports = router;