const User = require("../models/user.model");
const { validateEmailDB, validatePassword } = require("../../utils/validator");
const bycrypt = require("bcrypt");
const { generateToken } = require("../../utils/jwt");

const getUser = async (req, res) => {
  try {
    const user = await User.find();
    return res.status(200).json(user);
  } catch (error) {
    return res.json(error);
  }
};

// const getUserById = async (req, res) => {
//   try {
//     const userId = req.userProfile;
//     // console.log(userId);
//     const user = await User.findById(userId);
//        return res.status(200).json(user);
//   } catch (error) {}
// };

const register = async (req, res) => {
  try {
    const userBody = new User(req.body);
    const valEmail = await validateEmailDB(req.body.email);
    // console.log(`Val email: ${valEmail}`)
    // console.log(`body email: ${userBody.email}`)
    // console.log(`todo: ${userBody}`)

    if (!valEmail) {
      // console.log(valEmail);
      if (validatePassword(req.body.contraseña)) {
          // console.log(req.body.password);
        userBody.contraseña = bycrypt.hashSync(userBody.contraseña, 10);
        console.log(userBody);
        const createduser = await userBody.save();
        console.log(createduser);

        return res.json({ success: true, message: "Éxito", data: createduser });
      } else {
        return res.json({
          success: false,
          message: "La contraseña no cumple con el patron",
        });
      }
    }
    return res.json({ success: false, message: "El email ya existe" });
  } catch (error) {}
};



const login = async (req, res) => {
  try {
    const userInfo = req.body;
    // console.log(userInfo);
    const userDB = await validateEmailDB(userInfo.email);
    console.log(userDB);
    if (!userDB) {
      return res.json({ success: false, message: "El email no existe" });
    }
    if (!bycrypt.compareSync(userInfo.contraseña, userDB.contraseña)) {
      return res.json({ success: false, message: "La contraseña no coincide" });
    }

    const token = generateToken(userDB._id, userDB.email, userDB.role);
    return res.json({
      success: true,
      message: "Log in efectuado con éxito",
      token: token,
      userInfo: userDB,
    });
  } catch (error) {}
};
const profile = async (req, res) => {
  try {
    console.log(req.userProfile);
    return res.status(200).json(req.userProfile);
  } catch (error) {}
};
const getUserbyID = async (req, res) => {
  try {
    const  id  = req.params.id;
    console.log("ide de getbyID"+id);
    const userID = await User.findById( id );
    console.log(userID);

    return res.status(200).json(userID); 
  } catch {
    return res.json(error);
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Este videojuego no existe" });
    }
    return res.status(200).json(deletedUser);
  } catch (error) {}


};
const putUser = async (req, res) => {
  try {
    
    const { id } = req.params;
    const userBody = new User(req.body);
    userBody._id = id;
    // console.log(req.file.path);
    // if(req.file.path){
    //   userBody.foto = req.file.path;
    // }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      userBody,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Este videojuego no existe" });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {}
};
module.exports = { register, login, profile, getUser, getUserbyID,deleteUser, putUser };
