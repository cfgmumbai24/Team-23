const { Sales } = require("../models/sales");

exports.addSale = async (req, res) => {
  try {
    const {
      productId,
      rateOfUnit,
      quantity,
      clientId,
      fulfilled,
    } = req.body;

    // Create new sale
    const newSale = new Sales({
      productId,
      rateOfUnit,
      quantity,
      clientId,
      fulfilled,
    });

    await newSale.save();
    res.status(201).json(newSale);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
