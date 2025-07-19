const UserPreferences = require("../models/UserPreferences");

/**
 * Créer une nouvelle préférence utilisateur
 */
exports.createPreference = async (req, res) => {
  try {
    const { userId, categoryId, productId } = req.body;

    const existing = await UserPreferences.findOne({
      userId,
      categoryId
    });

    if (existing) {
      return res.status(400).json({ error: "Préférence déjà existante." });
    }

    const preference = new UserPreferences({ userId, categoryId, productId });
    await preference.save();

    res.status(201).json(preference);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Obtenir toutes les préférences d'un utilisateur
 */
exports.getPreferencesByUser = async (req, res) => {
  try {
    const { userId } = req.params.id;

    const preferences = await UserPreferences.find({ userId })
      .populate("categoryId")
      .populate("productId");

    res.json(preferences);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Supprimer une préférence spécifique
 */
exports.deletePreference = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const deleted = await UserPreferences.findOneAndDelete({
      userId,
      productId,
    });

    if (!deleted) {
      return res.status(404).json({ error: "Préférence non trouvée" });
    }

    res.json({ message: "Préférence supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Supprimer toutes les préférences d’un utilisateur
 */
exports.clearAllPreferences = async (req, res) => {
  try {
    const { userId } = req.params;

    await UserPreferences.deleteMany({ userId });

    res.json({ message: "Toutes les préférences ont été supprimées." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
