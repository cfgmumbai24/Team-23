const express = require("express");

const { connectDB } = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const descriptionRoutes = require("./routes/descriptionRoute");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config();
const salesRoutes = require("./routes/salesRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const emailRouter = require("./routes/emailRouter");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());
app.use(fileUpload());
// Define Routes
app.use("/api/v1", userRoutes);
app.use("/api/v1/", productRoutes);
app.use("/api/v1/", salesRoutes);
app.use("/api/v1/", inventoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/email", emailRouter);
app.use("/api/v1/gen", descriptionRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
