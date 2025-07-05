const express = require("express");
const router = express.Router();
const Preference = require("../models/Preference");

// Ajouter ou mettre à jour la liste de préférences
// documentation swagger
/**
 * @swagger
 * /api/preferences:
 *   post:
 *     summary: Ajouter ou mettre à jour la liste de préférences
 *     tags: [Preferences]
 */
router.post("/", async (req, res) => {
  try {
    const { userId, list } = req.body;

    if (!Array.isArray(list)) {
      return res.status(400).json({ message: "La liste doit être un tableau" });
    }

    const updatedPref = await Preference.findOneAndUpdate(
      { user: userId },
      {
        $set: {
          list,
          updatedAt: new Date(),
        },
      },
      { upsert: true, new: true }
    );

    res.status(200).json({
      message: "Préférences mises à jour",
      preferences: updatedPref,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtenir la liste des préférences d’un utilisateur
/**
 * @swagger
 * /api/preferences/{userId}:
 *   get:
 *     summary: Obtenir la liste des préférences d’un utilisateur
 *     tags: [Preferences]
 */
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const preferences = await Preference.findOne({ user: userId });

    if (!preferences)
      return res.status(404).json({ message: "Préférences non trouvées" });

    res.status(200).json(preferences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
