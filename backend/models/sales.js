const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Sales Schema
const SalesSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  rateOfUnit: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  fulfilled: {
    type: Boolean,
    required: true,
  },
});

// Client Schema
const ClientSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
});

const Sales = mongoose.model("Sales", SalesSchema);

module.exports = { Sales };
