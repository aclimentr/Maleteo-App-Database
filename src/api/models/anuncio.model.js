const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const anuncioSchema = new Schema(
  {
    titulo: { type: String, require: true },
    propiedad: { type: String, default: "casa", enum: ["casa", "hotel", "Establecimiento"], require: true},
    tipo: { type: String, default: "habitacion", enum: ["habitacion", "hall","trastero","buhardilla", "garaje"],require: true},
    direccion: { type: String, default:""},
    descripcion: { type: String, default:""},
    isTaken: { type: Boolean, default: false },
    image: [{ type: String, default: "" }],
    precio: { type: Number, default: 0 },
    servicio: { type: String, default:""},
    horario: {type: Date},
    user:  {type:Schema.Types.ObjectId,ref:"user"} ,
  },
  {
    collection: "Anuncios",
  }
);

const Anuncio = mongoose.model("Anuncios", anuncioSchema);
module.exports = Anuncio;
