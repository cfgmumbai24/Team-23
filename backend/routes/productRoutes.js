const express = require("express");
const router = express.Router();

const { addProduct, getProducts } = require("../controller/productController");

router.post("/add", addProduct);
router.get("/products", getProducts);

module.exports = router;
