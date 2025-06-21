const express = require("express");
const reviewController = require("../controllers/reviewController");
const reviewRouter = express.Router();
const verifyToken = require("../middlewares/verifyToken");

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Gestion des avis et notations des produits
 */

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Obtenir tous les avis
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des avis récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       500:
 *         description: Erreur serveur
 */
reviewRouter.get("/", verifyToken, reviewController.getAllReviews);

/**
 * @swagger
 * /api/reviews/{id}:
 *   get:
 *     summary: Obtenir un avis par ID
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'avis
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Avis trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Avis non trouvé
 */
reviewRouter.get("/:id", verifyToken, reviewController.getReviewById);

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Créer un nouvel avis
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Avis créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Données invalides
 */
reviewRouter.post("/", verifyToken, reviewController.createReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Supprimer un avis
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'avis à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Avis supprimé
 *       404:
 *         description: Avis non trouvé
 */
reviewRouter.delete("/:id", verifyToken, reviewController.deleteReview);

module.exports = reviewRouter;
