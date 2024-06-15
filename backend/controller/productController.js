// POST API to create a new product
const { Product } = require("../models/product");

exports.addProduct = async (req, res) => {
  try {
    const {
      category,
      title,
      description,
      length,
      breadth,
      weight,
      unitCost,
      timeToMake,
      status,
      quantity,
      color,
      creatorId,
      localId,
      keywordIds,
    } = req.body;

    // Handling file upload
    // if (!req.files || !req.files.images) {
    //   return res.status(400).json({ message: "No files were uploaded." });
    // }

    //   const images = req.files.images;
    //   let imagePaths = [];

    //   if (Array.isArray(images)) {
    //     imagePaths = images.map(image => `/uploads/${image.name}`);
    //     images.forEach(image => {
    //       image.mv(`${__dirname}/uploads/${image.name}`, err => {
    //         if (err) {
    //           return res.status(500).send(err);
    //         }
    //       });
    //     });
    //   } else {
    //     imagePaths = [`/uploads/${images.name}`];
    //     images.mv(`${__dirname}/uploads/${images.name}`, err => {
    //       if (err) {
    //         return res.status(500).send(err);
    //       }
    //     });
    //   }

    // Create new product
    const newProduct = new Product({
      //   images: imagePaths,
      category,
      title,
      description,
      length,
      breadth,
      weight,
      unitCost,
      timeToMake,
      status,
      quantity,
      color,
      creatorId,
      localId,
      keywords: keywordIds,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
