const Anuncio = require("../models/anuncio.model");
const {deleteFile} = require("../../middleware/delete.file")

const getAnuncios = async (req, res) => {
  try {
    const anuncios = await Anuncio.find();
    console.log(anuncios);
  
    return res.status(200).json(anuncios);
    
  } catch (error) {
    return res.json(error);
  }
};
const createAnuncio = async (req, res) => {
  try {
   // console.log(req.body);
    
    const body = req.body;
    const anuncios = new Anuncio(body);
    

  
    const createdAnuncio = await anuncios.save();
    // console.log(createdAnuncio);
    return res.json(createdAnuncio);
    
  } catch (error) {
    return res.json(error);
  }
};
const createAnunciomulti = async (req, res) => {
  try {
     const newAnuncio = new Anuncio(req.body)
    //  console.log(newAnuncio);
     for (const newAnuncioFile of req.files.images) {
        newAnuncio.images = [...newAnuncio.images, newAnuncioFile.path]
     }
    const createdAnuncio = await newAnuncio.save();
    console.log(createdAnuncio);
    return res.json(createdAnuncio)
  } catch (error) {
    return res.json(error);
  }
};
const editAnuncio = async (req, res) => {
  try {
    
    const { id } = req.params;
    const anuncioBody = new Anuncio(req.body);
    anuncioBody._id = id;
    // console.log(req.file.path);
    // if(req.file.path){
    //     videogameBody.image = req.file.path;
    // }
    const updateAnuncio = await Anuncio.findByIdAndUpdate(
      id,
      anuncioBody,
      { new: true }
    );

    if (!updateAnuncio) {
      return res.status(404).json({ message: "Este videojuego no existe" });
    }
    return res.status(200).json(updateAnuncio);
  } catch (error) {}
};
const deleteAnuncio = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAnuncio = await Anuncio.findByIdAndDelete(id);
    if (!deleteAnuncio) {
      return res.status(404).json({ message: "Este videojuego no existe" });
    }
    if(deleteAnuncio.images){
      for (const image of deleteAnuncio.images) {
        deleteFile(image)
      }
    }
    return res.status(200).json(deleteAnuncio);
  } catch (error) {}
};
const getAnunciobyID = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("ide de getbyID"+id);
    const anuncioID = await Anuncio.findOne({ _id: id });
    console.log(anuncioID);

    return res.status(200).json(anuncioID); 
  } catch {
    return res.json(error);
  }
};
const getAnunciobyDireccion = async (req, res) => {
  try {
    const direccion = req.params.id;
    
    console.log(req.params.id);
    const anuncioID = await Anuncio.find({ direccion: direccion });
    console.log(anuncioID);

    return res.status(200).json(anuncioID); 
  } catch {
    return res.json(error);
  }
};
module.exports = {
  getAnuncios,
  createAnuncio,
  editAnuncio,
  deleteAnuncio,
  getAnunciobyID,
  createAnunciomulti,
  getAnunciobyDireccion
};
