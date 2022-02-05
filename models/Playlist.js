const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
  nombre: {type: String, required: true},
  categoria: { type: String, enum: ['feeling badass', 'sad', 'jazzy', 'happy', 'romantic', 'travelling', 'concentration', 'optimistic', 'family diner', 'stressed out',] }, 
  genero: { type: String, enum: ['rock', 'pop', 'jazz', 'electronic', 'folk', 'instrumental', 'triphop', 'metal', 'rock', 'math rock',] },
  foto: [String],
  descripcion: {type:String, required: true},
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}, 
  plataforma:{type: String, enum:['spotify', 'deezer', 'youtube', 'apple music', 'tidal']},
}, { timestamps: true })

PlaylistSchema.methods.publicData = function(){
  return {
    id: this.id,
    nombre: this.nombre,
    categoria: this.categoria,
    fotos: this.fotos,
    descripcion: this.descripcion,
    anunciante: this.anunciante,
    ubicacion: this.ubicacion,
    estado: this.estado
  };
};

mongoose.model('Playlist', PlaylistSchema)