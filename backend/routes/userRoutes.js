const express = require("express");
const router = express.Router();
// const userController = require("../controllers/userController");
const { registerUser, getUsers } = require("../controller/userController");

router.post("/register", registerUser);
router.get("/", getUsers);

module.exports = router;
