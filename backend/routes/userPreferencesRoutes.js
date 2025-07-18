const express = require("express");
const router = express.Router();
const userPreferencesController = require("../controllers/userPreferencesController");
const verifyToken = require("../middlewares/verifyToken");

/**
 * @swagger
 * tags:
 *   name: UserPreferences
 *   description: Gestion des préférences utilisateur
 */

/**
 * @swagger
 * /api/preferences:
 *   post:
 *     summary: Créer une nouvelle préférence
 *     tags: [UserPreferences]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - categoryId
 *               - productId
 *             properties:
 *               userId:
 *                 type: string
 *               categoryId:
 *                 type: string
 *               productId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Préférence enregistrée
 *       400:
 *         description: Préférence déjà existante
 */
router.post("/", userPreferencesController.createPreference);

/**
 * @swagger
 * /api/preferences/user/{userId}:
 *   get:
 *     summary: Obtenir toutes les préférences d’un utilisateur
 *     tags: [UserPreferences]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Liste des préférences de l'utilisateur
 */
router.get(
  "/user/:userId",
  verifyToken,
  userPreferencesController.getPreferencesByUser
);

/**
 * @swagger
 * /api/preferences:
 *   delete:
 *     summary: Supprimer une préférence spécifique
 *     tags: [UserPreferences]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - productId
 *             properties:
 *               userId:
 *                 type: string
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Préférence supprimée
 *       404:
 *         description: Préférence non trouvée
 */
router.delete("/", verifyToken, userPreferencesController.deletePreference);

/**
 * @swagger
 * /api/preferences/user/{userId}:
 *   delete:
 *     summary: Supprimer toutes les préférences d’un utilisateur
 *     tags: [UserPreferences]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Préférences supprimées
 */
router.delete(
  "/user/:userId",
  verifyToken,
  userPreferencesController.clearAllPreferences
);

module.exports = router;
