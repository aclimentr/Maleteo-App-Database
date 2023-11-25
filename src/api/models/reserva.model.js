const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shopSchema = new Schema(
  {
    user:  {type:Schema.Types.ObjectId,ref:"user"} ,
    anuncio: {type:Schema.Types.ObjectId,ref:"Anuncios"} ,
    fecha: { type: Date },
    deposito: {type: String},
    retirada: {type: String},
    equipaje: {type: String},
    tiempoStart: { type: Date},
    tiempoEnd: { type: Date},


  },
  {
    collection: "reserva",
  }
);

const Shop = mongoose.model("reserva", shopSchema);
module.exports = Shop;
