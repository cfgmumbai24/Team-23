const { Product } = require("../models/product");

exports.getInventory = async (req, res) => {
  try {
    const inventory = await Product.find().lean();
    res.status(200).json(inventory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
