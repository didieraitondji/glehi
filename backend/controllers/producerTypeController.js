const ProducerType = require("../models/ProducerType");

// Obtenir tous les types de producteurs
exports.getAllProducerTypes = async (req, res) => {
  try {
    const types = await ProducerType.find();
    res.json(types);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtenir un type de producteur par typeId
exports.getProducerTypeById = async (req, res) => {
  try {
    const type = await ProducerType.findOne({ typeId: req.params.id });
    if (!type) return res.status(404).json({ error: "Type non trouvé" });
    res.json(type);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Créer un nouveau type de producteur
exports.createProducerType = async (req, res) => {
  try {
    const { name, description, image } = req.body;

    const newType = new ProducerType({
      name,
      description,
      image,
    });

    await newType.save();
    res.status(201).json(newType);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Mettre à jour un type de producteur par typeId
exports.updateProducerType = async (req, res) => {
  try {
    const updates = { ...req.body };

    const updatedType = await ProducerType.findOneAndUpdate(
      { typeId: req.params.id },
      updates,
      { new: true }
    );

    if (!updatedType) return res.status(404).json({ error: "Type non trouvé" });

    res.json(updatedType);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Supprimer un type de producteur par typeId
exports.deleteProducerType = async (req, res) => {
  try {
    const deleted = await ProducerType.findOneAndDelete({
      typeId: req.params.id,
    });

    if (!deleted) return res.status(404).json({ error: "Type non trouvé" });

    res.json({ message: "Type supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtenir tous les types de producteurs et leurs produits
exports.getAllProducerTypesWithProducts = async (req, res) => {
  try {
    const types = await ProducerType.find().populate("products");
    res.json(types);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};