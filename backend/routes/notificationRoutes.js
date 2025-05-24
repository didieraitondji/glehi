// routes/notificationRoutes.js
const express = require("express");
const notificationController = require("../controllers/notificationController");
const notificationRouter = express.Router();

notificationRouter.get("/", notificationController.getAllNotifications);
notificationRouter.get("/:id", notificationController.getNotificationById);
notificationRouter.post("/", notificationController.createNotification);
notificationRouter.put("/:id", notificationController.markAsRead);
notificationRouter.delete("/:id", notificationController.deleteNotification);

module.exports = notificationRouter;
