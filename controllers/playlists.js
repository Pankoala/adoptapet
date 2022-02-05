const mongoose = require('mongoose')
const Playlista = mongoose.model('Playlist')

function crearPlaylist(req, res, next) {
  var playlist = new Playlist(req.body)
  playlist.usuario = req.usuario.id
  playlist.privacidad = 'publica'
  playlist.save().then(playlist => {
    res.status(201).send(playlist)
  }).catch(next)
}

function obtenerPlaylists(req, res, next) {
  if(req.params.id){
    Playlist.findById(req.params.id)
			.populate('usuario', 'username bio foto', 'playlist', 'nombre foto categoria').then(playlists => {
	      res.send(playlists)
	    }).catch(next)
  } else {
    Playlist.find().then(playlists=>{
      res.send(playlistss)
    }).catch(next)
  }
}

function obtenerPlaylist(req, res) {
  var playlist1 = new Playlist(1, 'Happy Playlist', 'Spotify', 'https://pankoala.github.io/playlister/assets/img/album2.png','Chill','1');
  res.send(playlist1)
}


function modificarPlaylist(req, res, next) {
  console.log("Playlist a modificar: " + req.params.id ) 

  Playlist.findById(req.params.id).then(playlist => { 

    if (!playlist) { return res.sendStatus(401); }   

    let idUsuario=req.usuario.id;                  
    console.log(" Creador de playlist: " + idUsuario);
    if( idUsuario == idAnunciante ){
      let nuevaInfo = req.body
      if (typeof nuevaInfo.nombre !== 'undefined')
        playlist.nombre = nuevaInfo.nombre
      if (typeof nuevaInfo.categoria !== 'undefined')
        playlist.categoria = nuevaInfo.categoria
      if (typeof nuevaInfo.fotos !== 'undefined')
        playlist.foto = nuevaInfo.foto
      if (typeof nuevaInfo.descripcion !== 'undefined')
        playlist.descripcion = nuevaInfo.descripcion
      playlist.save().then(updatedPlaylist => {
        res.status(201).json(updatedPlaylist.publicData())
      }).catch(next)
    } 
    else{
      return res.sendStatus(401);
    }
  }).catch(next)
}

function eliminarPlaylist(req, res) {
  Playlist.findById(req.params.id).then(playlist => {

    if (!playlist) { return res.sendStatus(401); }
    
    let idUsuario=req.usuario.id;
    console.log("Usuario que modifica " + idUsuario);

    if( idUsuario == idAnunciante ){
      let nombrePlaylist = playlist.nombre;
      playlist.deleteOne();
      res.status(200).send(`Playlist ${req.params.id} eliminada. ${nombrePlaylist}`);
    }else{
      return res.sendStatus(401);
    }
  });

module.exports = {
  crearPlaylist,
  obtenerPlaylist,
  modificarPlaylist,
  eliminarPlaylist,
  obtenerPlaylist,
}