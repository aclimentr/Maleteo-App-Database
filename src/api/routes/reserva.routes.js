const express = require("express")
const { getReserva, postReserva, editReserva, deleteReserva,getReservaByid } = require("../controllers/reserva.controllers")
const { isAdmin } = require("../../middleware/auth")
const router = express.Router()


router.get("/:id", getReservaByid);

router.get("/", getReserva);

router.post("/", postReserva);
router.put("/:id", [isAdmin], editReserva);
router.delete("/:id", [isAdmin], deleteReserva)



module.exports = router;