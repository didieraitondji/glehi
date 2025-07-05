const mongoose = require("mongoose");

const PreferenceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  list: {
    type: [String], // une liste de chaînes (par ex. ["maïs", "riz", "igname"])
    default: [],
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

module.exports = mongoose.model("Preference", PreferenceSchema);
