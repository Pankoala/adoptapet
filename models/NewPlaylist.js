  const mongoose = require("mongoose");

  var SolicitudSchema = new mongoose.Schema(
    {
      playlist: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Playlist",
      },
      anunciante: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Usuario",
      },
      solicitante: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Usuario",
      },
      estado: { type: String, enum: ["aceptada", "cancelada", "pendiente"] },
    },
    { collection: "solicitudes", timestamps: true }
  );
  
SolicitudSchema.methods.publicData = function(){
  return {
    id: this.id,   
    idPlaylist: this.idPlaylist,
    fechaCreacion: this.fechaCreacion,
    idAnunciante: this.idAnunciante,
    idSolicitante: this.idSolicitante,
    estado: this.estado
  };
};
    
mongoose.model('Solicitud', SolicitudSchema)