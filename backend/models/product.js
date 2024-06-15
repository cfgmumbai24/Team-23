const mongoose = require("mongoose");

// Define a counter schema to keep track of the SKU number
const CounterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", CounterSchema);

// Product Schema
const ProductSchema = new mongoose.Schema({
  images: {
    type: [String],
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["1", "2", "3", "4", "5", "6"],
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
  breadth: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: false,
  },
  unitCost: {
    type: Number,
    required: true,
  },
  timeToMake: {
    type: Number,
    required: true, // In hours
  },
  status: {
    type: Boolean,
    default: false,
  },
  quantity: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  localId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  keywords: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Keyword",
    },
  ],
});

// Pre-save middleware to auto-generate skuId
ProductSchema.pre("save", async function (next) {
  const product = this;

  if (!product.isNew) {
    return next();
  }

  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "product" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    product.skuId = `SKU${counter.seq.toString().padStart(6, "0")}`;
    next();
  } catch (error) {
    next(error);
  }
});

// Keyword Schema
const KeywordSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
    unique: true,
  },
});

const Product = mongoose.model("Product", ProductSchema);
const Keyword = mongoose.model("Keyword", KeywordSchema);

module.exports = { Product, Keyword };
