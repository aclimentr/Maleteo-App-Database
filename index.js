const express = require("express");
const { connectDb } = require("./src/utils/database");
const routerAnuncios = require("./src/api/routes/anuncios.routes");
const routerReservas = require("./src/api/routes/reserva.routes");
const routesUser = require("./src/api/routes/user.routes");

const env = require("dotenv");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const server = express();

env.config();
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});

server.use(cors());

//En este paso añadimos cors y definimos las direcciones que van a tener permiso para utilizar nuestra API. De momento en local:


server.use(express.json());
connectDb();

server.use("/anuncios", routerAnuncios);

server.use("/reservas", routerReservas);

server.use("/user", routesUser);




const PORT = 5000;
server.listen(PORT, () => {
  console.log("Escuchando por el puerto " + PORT);
});
