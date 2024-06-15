const { Product } = require("../models/product");
const { Sales } = require("../models/sales");

exports.getInventory = async (req, res) => {
  try {
    // Fetch all products
    const products = await Product.find();

    // Fetch all fulfilled sales
    const fulfilledSales = await Sales.find({ fulfilled: true });

    // Create a map to store the total quantity sold for each product
    const salesMap = new Map();

    fulfilledSales.forEach(sale => {
      if (salesMap.has(sale.productId.toString())) {
        salesMap.set(sale.productId.toString(), salesMap.get(sale.productId.toString()) + sale.quantity);
      } else {
        salesMap.set(sale.productId.toString(), sale.quantity);
      }
    });

    // Adjust the product quantities based on the sales
    const inventory = products.map(product => {
      const soldQuantity = salesMap.get(product._id.toString()) || 0;
      return {
        ...product._doc,
        quantity: product.quantity - soldQuantity
      };
    });

    res.status(200).json(inventory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
