const Category = require("../models/Category");
const Product = require("../models/Product");

// Obtenir toutes les catégories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtenir une catégorie par categoryId (et non _id)
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findOne({ categoryId: req.params.id });
    if (!category)
      return res.status(404).json({ error: "Catégorie non trouvée" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Créer une nouvelle catégorie
exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Mettre à jour une catégorie via categoryId
exports.updateCategory = async (req, res) => {
  try {
    const updated = await Category.findOneAndUpdate(
      { categoryId: req.params.id },
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ error: "Catégorie non trouvée" });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Supprimer une catégorie via categoryId
exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({
      categoryId: req.params.id,
    });

    if (!deleted)
      return res.status(404).json({ error: "Catégorie non trouvée" });

    res.json({ message: "Catégorie supprimée" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.getCategoriesByProductId = async (req, res) => {
  try {
    const categories = await Category.find({ products: req.params.productId });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCategoriesByReviewerId = async (req, res) => {
  try {
    const categories = await Category.find({
      reviewers: req.params.reviewerId,
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCategoriesByProductIdAndReviewerId = async (req, res) => {
  try {
    const categories = await Category.find({
      products: req.params.productId,
      reviewers: req.params.reviewerId,
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.find({ categoryId: id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

