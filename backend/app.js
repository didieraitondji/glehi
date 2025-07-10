const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerConfig");

const app = express();

// === Middleware global ===
app.use(express.json());
app.use(cors());

// === Documentation Swagger ===
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// === Import des routes ===
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const messageRoutes = require("./routes/messageRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const authRoutes = require("./routes/authRoutes");
const preferenceRoutes = require("./routes/userPreferencesRoutes");
const producerRoutes = require("./routes/producerTypeRoutes");

// === Utilisation des routes ===
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/preferences", preferenceRoutes);

// === Route par défaut ===
app.get("/", (req, res) => {
  res.send(`
    <h2>Bienvenue sur l'API GLEHI</h2>
    <p>Consultez la <a href="/api-docs">documentation Swagger</a>.</p>
  `);
});

module.exports = app;
//
