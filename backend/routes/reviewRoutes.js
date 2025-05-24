// routes/reviewRoutes.js
const express = require("express");
const reviewController = require("../controllers/reviewController");
const reviewRouter = express.Router();

reviewRouter.get("/", reviewController.getAllReviews);
reviewRouter.get("/:id", reviewController.getReviewById);
reviewRouter.post("/", reviewController.createReview);
reviewRouter.delete("/:id", reviewController.deleteReview);

module.exports = reviewRouter;
