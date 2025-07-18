// models/Product.js
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  quantity: { type: Number },
  price: { type: Number },
  categoryId: {
    type: String,
    required: true,
  },
  images: { type: String },
  available: { type: Boolean, default: true },
  isFavorite: { type: Boolean, default: false },
  discount: { type: Number, default: 0 },
  units: { type: String },
  sellerId: {
    type: String,
    default: "no-seller",
  },

  // Localisation géographique
  /*location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      default: undefined,
    },
  },

  // Adresse lisible (via reverse geocoding)
  address: {
    type: String,
    default: "",
  }, */

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Index géospatial pour les recherches
// ProductSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Product", ProductSchema);
