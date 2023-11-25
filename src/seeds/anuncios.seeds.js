const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Anuncio = require("../api/models/anuncio.model");

const anuncios = [
  {
    titulo: "Almacenamiento amplio",
    propiedad: "casa",
    tipo: "habitacion",
    direccion: "Madrid",
    descripcion: "Amplia habitación para almacenamiento de maletas.",
    isTaken: false,
    image: "https://www.poderyliderazgo.cl/wp-content/uploads/2018/05/Co-OL.jpg",
    precio: 15,
  },
  {
    titulo: "Casa con garaje",
    propiedad: "casa",
    tipo: "garaje",
    direccion: "Madrid",
    descripcion: "Garaje seguro para guardar maletas y objetos personales.",
    isTaken: false,
    image: ["https://media-cdn.tripadvisor.com/media/photo-s/13/7c/80/0e/hotel-casa-mia.jpg"],
    precio: 20,
  },
  {
    titulo: "Apartamento céntrico",
    propiedad: "casa",
    tipo: "hall",
    direccion: "Madrid",
    descripcion: "Hall espacioso para almacenar maletas de forma segura.",
    isTaken: false,
    image: "https://visitmanzanillo.mx/wp-content/uploads/2020/01/hoteles.jpg",
    precio: 18,
  },
  {
    titulo: "Establecimiento comercial",
    propiedad: "Establecimiento",
    tipo: "trastero",
    direccion: "Madrid",
    descripcion: "Trastero en un establecimiento para guardar maletas.",
    isTaken: false,
    image: "https://imgar.zonapropcdn.com/avisos/resize/1/00/45/32/63/04/1200x1200/1708874242.jpg",
    precio: 25,
  },
  {
    titulo: "Suite con bodega",
    propiedad: "hotel",
    tipo: "buhardilla",
    direccion: "Valencia",
    descripcion:
      "Buhardilla en un hotel de lujo para almacenamiento exclusivo.",
    isTaken: false,
    image: "https://img10.naventcdn.com/avisos/18/00/58/44/20/96/1200x1200/218415070.jpg",
    precio: 30,
  },
  {
    titulo: "Almacén industrial",
    propiedad: "Establecimiento",
    tipo: "garaje",
    direccion: "Valencia",
    descripcion: "Garaje industrial para guardar maletas de gran tamaño.",
    isTaken: false,
    image: "http://www.emprenomic.com/wp-content/uploads/2016/05/hotel.jpg",
    precio: 22,
  },
  {
    titulo: "Habitación privada",
    propiedad: "casa",
    tipo: "habitacion",
    direccion: "Barcelona",
    descripcion:
      "Habitación acogedora para almacenar maletas de forma privada.",
    isTaken: false,
    image: "https://img10.naventcdn.com/avisos/20/00/54/35/83/43/720x532/97098590.jpg",
    precio: 15,
  },
  {
    titulo: "Garaje residencial",
    propiedad: "casa",
    tipo: "garaje",
    direccion: "Valencia",
    descripcion: "Garaje seguro en una zona residencial para guardar maletas.",
    isTaken: false,
    image: "https://media-cdn.tripadvisor.com/media/photo-s/0e/80/73/29/hotel-casavieja.jpg",
    precio: 18,}
];

mongoose.connect(process.env.DB_URL);

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const allAnuncios = await Anuncio.find();

    if (allAnuncios.length) {
      await Anuncio.collection.drop();
      console.log("Drop database");
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
    await Anuncio.insertMany(anuncios);
    console.log(anuncios);
  })
  .catch((err) => console.log(`Error creating data: ${err}`))

  .finally(() => mongoose.disconnect());
