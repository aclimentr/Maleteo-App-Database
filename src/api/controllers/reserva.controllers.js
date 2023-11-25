const Reserva = require("../models/reserva.model");

const getReserva = async (req, res) => {
    try {
        const shops = await Reserva.find().populate("user anuncio");
        return res.status(200).json(shops)

    } catch (error) {
        return res.json(error)
    }
};

const postReserva = async (req, res, ) => {
    try {
        const body = req.body;
        const shop = new Reserva(body);
// Actualizar este file path a lo que necesitemos
        // if (req.file.path) {
        //     shop.image = req.file.path;
        // }
        const createdShop = await shop.save();
        return res.json(createdShop)
    } catch (error) {
        return res.json(error)
    }
};

const editReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const reservaBody = new Reserva(req.body);
       reservaBody._id = id;
        const updateReserva = await Shop.findByIdAndUpdate(id, reservaBody, { new: true });
        if (!updateReserva) {
            return res.status(404).json({ message: "Esta tienda no existe" })
        }
        return res.status(200).json(updateReserva)
    } catch (error) {

    }
};
const deleteReserva = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteReserva = await Shop.findByIdAndDelete(id);
        if (!deleteReserva) {
            return res.status(404).json({ message: "Esta tienda no existe" })
        }
        return res.status(200).json(deleteReserva)

    } catch (error) {

    }
}


const getReservaByid = async (req, res) => {
    try {
        const  id  = req.params.id;
    console.log("ide de getbyID"+id);
    const reservaiD = await Reserva.findById( id ).populate("user anuncio");
    console.log(reservaiD);

        
        return res.status(200).json(reservaiD)
    } catch {
        return res.json(error)
    }
}
module.exports = { getReserva, postReserva, editReserva, deleteReserva, getReservaByid }