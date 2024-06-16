const express = require("express");
const router = express.Router();
const salesController = require("../controller/salesController");

// GET sales route
router.get("/sales", salesController.getSales);

// POST new sale route
router.post("/sales", salesController.addSale);

module.exports = router;
