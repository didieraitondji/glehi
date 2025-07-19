const mongoose = require("mongoose");

const UserPreferencesSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    categoryId: {
      type: String,
      ref: "Category",
      required: true,
    },
    productId: {
      type: String,
      ref: "Product",
      required: false,
    },
  },
  {
    timestamps: true, // ajoute createdAt et updatedAt
  }
);

module.exports = mongoose.model("UserPreferences", UserPreferencesSchema);
