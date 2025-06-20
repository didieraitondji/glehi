// Message.js
const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: String,
  read: Boolean,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", MessageSchema);
