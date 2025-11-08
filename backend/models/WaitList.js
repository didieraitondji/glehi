// models/Waitlist.js
const mongoose = require("mongoose");

const waitlistSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email invalide",
      ],
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "notified", "converted"],
      default: "pending",
    },
    metadata: {
      source: String,
      userAgent: String,
      ipAddress: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index pour recherche rapide
waitlistSchema.index({ email: 1 });
waitlistSchema.index({ status: 1, subscribedAt: -1 });

module.exports = mongoose.model("Waitlist", waitlistSchema);
