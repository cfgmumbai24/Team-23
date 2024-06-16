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
    default: 'False',
  },
});

// Middleware to update product quantity when fulfilled is changed to true
// SalesSchema.pre('save', async function(next) {
//   if (this.isModified('fulfilled') && this.fulfilled) {
//     try {
//       const Product = mongoose.model('Product');
//       const sale = this;

//       const product = await Product.findById(sale.productId);
//       if (!product) {
//         throw new Error('Product not found');
//       }

//       if (product.quantity < sale.quantity) {
//         throw new Error('Insufficient product quantity');
//       }

//       product.quantity -= sale.quantity;
//       await product.save();
//     } catch (error) {
//       return next(error);
//     }
//   }
//   next();
// }); 

const Sales = mongoose.model("Sales", SalesSchema);

module.exports = { Sales };
