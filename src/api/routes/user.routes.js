const express = require("express");

const {
  register,
  login,
  profile,
  getUser,
  getUserbyID,
  deleteUser,
  putUser,
} = require("../controllers/user.controller");
const { isAdmin } = require("../../middleware/auth");
const { isAuth } = require("../../middleware/auth");
const { isAuthProfile } = require("../../middleware/profile-auth");
const upload = require("../../middleware/upload.cloudy");
const router = express.Router();

// router.get("/profile/", profile); // url del user logueado
router.get("/profile/:id", getUserbyID); //url para el admin

router.post("/register", register);
router.post("/login", login);
router.get("user/profile", profile);

router.get("/allusers", getUser);// url solo es del admin para ver a todos los users
router.put("/edit/:id", putUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
