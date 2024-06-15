// POST API to create a new product
const { Product } = require("../models/product");
const { createClient } = require("@supabase/supabase-js");
const {
  generateProduct,
  generateProductData,
  transformedData,
} = require("../utils");

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.ANON_KEY);

async function uploadFileToSupabase(file, bucketName, filePath) {
  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file.data, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw error;
    }

    const { publicURL } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);
    return publicURL;
  } catch (error) {
    console.error("Error uploading file to Supabase:", error);
    throw new Error(`Failed to upload file: ${error.message}`);
  }
}

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
    if (!req.files) {
      return res.status(400).json({ message: "No files were uploaded." });
    }

    // console.log(images, "images");
    const imagePaths = [];
    const bucketName = "jpmc";

    for (const key in req.files) {
      if (req.files) {
        const file = req.files[key];
        const filePath = `${key}/${file.name}`;
        console.log(file, "file");
        const imageUrl = await uploadFileToSupabase(file, bucketName, filePath);
        imagePaths.push(imageUrl);
      }
    }

    // Create new product
    const newProduct = new Product({
      images: imagePaths,
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

// GET API to fetch products
exports.getProducts = async (req, res) => {
  try {
    const { creatorId } = req.query;
    const products = [];
    // let products;
    // if (creatorId) {
    //   products = await Product.find({ creatorId });
    // } else {
    //   products = await Product.find();
    // }

    // for (let i = 0; i < 20; i++) {
    //   products.push(productData);
    // }
    const productData = transformedData;

    res.status(200).json(productData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
