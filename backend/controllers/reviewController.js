const Review = require("../models/Review");

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("reviewerId")
      .populate("productId");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate("reviewerId")
      .populate("productId");
    if (!review) return res.status(404).json({ error: "Avis non trouvé" });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!review) return res.status(404).json({ error: "Avis non rencontré" });
    res.json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ error: "Avis non rencontré" });
    res.json({ review: "Avis supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReviewsByProductId = async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId })
      .populate("reviewerId")
      .populate("productId");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReviewsByReviewerId = async (req, res) => {
  try {
    const reviews = await Review.find({ reviewerId: req.params.reviewerId })
      .populate("reviewerId")
      .populate("productId");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReviewsByProductIdAndReviewerId = async (req, res) => {
  try {
    const reviews = await Review.find({
      productId: req.params.productId,
      reviewerId: req.params.reviewerId,
    })
      .populate("reviewerId")
      .populate("productId");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUnreadReviewsByReviewerId = async (req, res) => {
  try {
    const reviews = await Review.find({
      reviewerId: req.params.reviewerId,
      read: false,
    })
      .populate("reviewerId")
      .populate("productId");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUnreadReviewsByProductId = async (req, res) => {
  try {
    const reviews = await Review.find({
      productId: req.params.productId,
      read: false,
    })
      .populate("reviewerId")
      .populate("productId");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUnreadReviewsByProductIdAndReviewerId = async (req, res) => {
  try {
    const reviews = await Review.find({
      productId: req.params.productId,
      reviewerId: req.params.reviewerId,
      read: false,
    })
      .populate("reviewerId")
      .populate("productId");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
