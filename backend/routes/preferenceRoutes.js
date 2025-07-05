const express = require("express");
const router = express.Router();
const Preference = require("../models/Preference");

/**
 * @swagger
 * components:
 *   schemas:
 *     Preference:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 66a49ee3e8b3dbb9fbc2f279
 *         user:
 *           type: string
 *           example: 66a49e91e8b3dbb9fbc2f278
 *         list:
 *           type: array
 *           items:
 *             type: string
 *           example: ["maïs", "riz", "igname"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/preferences:
 *   post:
 *     summary: Ajouter ou mettre à jour la liste de préférences d'un utilisateur
 *     tags: [Preferences]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - list
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID de l'utilisateur
 *                 example: 66a49e91e8b3dbb9fbc2f278
 *               list:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Liste des préférences
 *                 example: ["maïs", "riz", "igname"]
 *     responses:
 *       200:
 *         description: Préférences mises à jour
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Préférences mises à jour
 *                 preferences:
 *                   $ref: '#/components/schemas/Preference'
 *       400:
 *         description: Liste invalide
 *       500:
 *         description: Erreur serveur
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

/**
 * @swagger
 * /api/preferences/{userId}:
 *   get:
 *     summary: Récupérer les préférences d’un utilisateur
 *     tags: [Preferences]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Préférences récupérées
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Preference'
 *       404:
 *         description: Préférences non trouvées
 *       500:
 *         description: Erreur serveur
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
