const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// User Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessLevel: {
    type: Number,
    required: true,
    enum: [1, 2, 3], // Only allow values 1, 2, or 3
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null, // Parent ID is optional
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
