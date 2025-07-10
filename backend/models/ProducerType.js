// models/ProducerType.js
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const ProducerTypeSchema = new mongoose.Schema(
  {
    typeId: {
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
      default: "", // lien URL ou nom de fichier
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProducerType", ProducerTypeSchema);
