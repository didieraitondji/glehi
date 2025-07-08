// User.js
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  profile_image: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  producer_type: {
    type: String,
    enum: ["individual", "cooperative", "enterprise", "other"],
    default: "individual",
  },
  address: {
    type: String,
    default: "",
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      default: undefined,
    },
  },
  verify_account: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["farmer", "buyer", "admin"],
    default: "buyer",
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

// Index géospatial
UserSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("User", UserSchema);
