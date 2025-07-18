// models/Category.js
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const CategorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: String,
      unique: true,
      default: uuidv4,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "", // URL ou nom du fichier
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
