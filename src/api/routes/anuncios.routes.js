const express = require("express");
const {
  getAnuncios,
  createAnuncio,
  editAnuncio,
  deleteAnuncio,
  getAnunciobyID,
  getAnunciobyDireccion
} = require("../controllers/anuncio.controllers");
const upload = require("../../middleware/upload.cloudy");
const { isAuth } = require("../../middleware/auth");

const router = express.Router();
// 
router.get("/", getAnuncios);
router.post("/", createAnuncio);
// router.get("/:titleVideogame", getVideogamebyTitle);
router.put("/:id", upload.fields([{name:"images"}]), editAnuncio);
router.delete("/:id", deleteAnuncio);
router.get("/id/:id", getAnunciobyID);
router.get("/:id", getAnunciobyDireccion);

module.exports = router;
