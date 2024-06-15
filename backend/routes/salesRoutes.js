const express = require("express");
const router = express.Router();
const salesController = require("../controller/salesController");

// POST API to create a new sale
router.post("/sales", salesController.addSale);

module.exports = router;
