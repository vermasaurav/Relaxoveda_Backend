const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes")
const orderRoutes = require("./routes/orderRoutes");


dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static Folder
app.use("/uploads", express.static("uploads"));

// Test Route
app.get("/", (req, res) => {
  res.send("API Running Successfully");
});

// Routes
app.use(
  "/api/categories",
  require("./routes/categoryRoutes")
);

app.use(
  "/api/advertise",
  require("./routes/advertiseRoutes")
);
app.use("/api/products",productRoutes);
app.use("/api/payment", require("./routes/payment"));
app.use("/api/orders",orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server runningggg on port ${PORT}`);
});