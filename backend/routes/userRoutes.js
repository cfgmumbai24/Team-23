const express = require("express");
const router = express.Router();
// const userController = require("../controllers/userController");
const { registerUser, getUsers,signUpUser,UserLogin } = require("../controller/userController");

router.post("/register", registerUser);
router.get("/", getUsers);
router.post('/signup',signUpUser);
router.post('/login',UserLogin);


module.exports = router;
