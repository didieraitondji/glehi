const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  phone: { type: String },
  password: { type: String },
  role: {
    type: String,
    enum: ["farmer", "buyer", "admin"],
    default: "buyer",
  },

  // Localisation géographique (optionnelle)
  location: {
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

  // Adresse lisible (facultative, obtenue via reverse geocoding)
  address: {
    type: String,
    default: "",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Index géospatial requis pour les recherches avec $near
UserSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("User", UserSchema);
