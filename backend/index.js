const express = require("express");
const { connectDB } = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const descriptionRoutes = require("./routes/descriptionRoute");
const fileUpload = require("express-fileupload");
const emailRouter = require("./routes/emailRouter");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cors());
app.use(fileUpload());
// Define Routes
app.use("/api/v1", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/email", emailRouter);
app.use("/api/v1/gen", descriptionRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
