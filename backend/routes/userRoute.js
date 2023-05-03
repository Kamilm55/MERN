const express = require("express");
const { registerUser, loginUser, logout, getUserdata, loginStatus, updateUser, changePassword, forgotPassword } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/logout",logout);
router.get("/loginStatus",loginStatus);
router.get("/getUser",protect,getUserdata);// at first it checks that if there is an authorized account before every request . It first go to protect then get user info if it fails do not go .It place in the middle of the processes, 
// protect is middleware that protects the route from not authorized persons.
router.patch("/updateUser",protect,updateUser);//PATCH is used to partially update a resource or document
router.patch("/changePassword",protect,changePassword);
router.post("/forgotPassword",forgotPassword);

module.exports = router ;