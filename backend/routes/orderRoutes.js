const express = require("express");
const orderController = require("../controllers/orderController");
const orderRouter = express.Router();
const verifyToken = require("../middlewares/verifyToken");

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Gestion des commandes de produits
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Obtenir toutes les commandes
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des commandes récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Erreur serveur
 */
orderRouter.get("/", verifyToken, orderController.getAllOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Obtenir une commande par ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la commande
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Commande trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Commande non trouvée
 */
orderRouter.get("/:id", verifyToken, orderController.getOrderById);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Créer une nouvelle commande
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Commande créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Données invalides
 */
orderRouter.post("/", verifyToken, orderController.createOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Modifier une commande
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la commande à modifier
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Commande modifiée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Commande non trouvée
 */
orderRouter.put("/:id", verifyToken, orderController.updateOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Supprimer une commande
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la commande à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Commande supprimée
 *       404:
 *         description: Commande non trouvée
 */
orderRouter.delete("/:id", verifyToken, orderController.deleteOrder);

module.exports = orderRouter;
