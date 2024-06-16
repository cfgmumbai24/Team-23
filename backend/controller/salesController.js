// controllers/salesController.js
const { Sales } = require('../models/sales');

exports.addSale = async (req, res) => {
  try {
    const { productId, rateOfUnit, quantity, clientId } = req.body;

    if (!productId || !rateOfUnit || !quantity || !clientId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newSale = new Sales({
      productId,
      rateOfUnit,
      quantity,
      clientId,
      fulfilled: false // Explicitly set fulfilled to a boolean value
    });

    await newSale.save();

    res.status(201).json(newSale);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getSales = async (req, res) => {
  try {
    const sales = await Sales.find()
      .populate('productId')
      .populate('clientId')
      .lean();
    res.status(200).json(sales);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};