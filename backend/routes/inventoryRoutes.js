const express = require("express");
const router = express.Router();
const inventory = require("../controller/inventory");

// GET API to display the inventory
router.get("/inventory", inventory.getInventory);

module.exports = router;
