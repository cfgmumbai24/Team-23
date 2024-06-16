const express = require("express");
const router = express.Router();
const inventoryController = require("../controller/inventoryController");

// GET inventory route
router.get("/inventory", inventoryController.getInventory);

module.exports = router;
