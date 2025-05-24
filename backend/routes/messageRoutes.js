// routes/messageRoutes.js
const express = require("express");
const messageController = require("../controllers/messageController");
const messageRouter = express.Router();

messageRouter.get("/", messageController.getAllMessages);
messageRouter.get("/:id", messageController.getMessageById);
messageRouter.post("/", messageController.createMessage);
messageRouter.delete("/:id", messageController.deleteMessage);

module.exports = messageRouter;
