const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  quantity: Number,
  price: Number,
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  images: String,
  available: Boolean,
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  location: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", ProductSchema);
