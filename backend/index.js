const express = require("express");

const { connectDB } = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config();
const salesRoutes = require("./routes/salesRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(fileUpload());
// Define Routes
app.use("/api/v1", userRoutes);
app.use("/api/v1/", productRoutes);
app.use("/api/v1/", salesRoutes);
app.use("/api/v1/", inventoryRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
