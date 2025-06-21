const express = require("express");
const transactionController = require("../controllers/transactionController");
const transactionRouter = express.Router();
const verifyToken = require("../middlewares/verifyToken");

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Gestion des transactions de paiement
 */

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Obtenir toutes les transactions
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des transactions récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       500:
 *         description: Erreur serveur
 */
transactionRouter.get(
  "/",
  verifyToken,
  transactionController.getAllTransactions
);

/**
 * @swagger
 * /api/transactions/{id}:
 *   get:
 *     summary: Obtenir une transaction par ID
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la transaction
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Transaction non trouvée
 */
transactionRouter.get(
  "/:id",
  verifyToken,
  transactionController.getTransactionById
);

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Créer une nouvelle transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: Transaction créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Données invalides
 */
transactionRouter.post(
  "/",
  verifyToken,
  transactionController.createTransaction
);

module.exports = transactionRouter;
