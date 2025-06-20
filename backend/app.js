const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

// Middlewares
app.use(express.json());

// Import des routes
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const messageRoutes = require("./routes/messageRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/notifications", notificationRoutes);

// Route de test
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "api-docs.html"));
});

module.exports = app;
