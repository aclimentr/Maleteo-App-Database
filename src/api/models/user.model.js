const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const userSchema = new Schema({
    email: { type: String, required: true },
    contraseña: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    isGuardian: { type: Boolean, default: false },
    fecha: { type: Date },
    role: { type: String, default: "user", enum: ["admin", "user","guardian"] },
    foto: {type: String, default: ""},
}, {
    collection: "user"
});


const User = mongoose.model("user", userSchema)
module.exports = User;