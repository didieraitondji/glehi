const express = require("express");
const messageController = require("../controllers/messageController");
const messageRouter = express.Router();
const verifyToken = require("../middlewares/verifyToken");

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Gestion des messages entre utilisateurs
 */

/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Obtenir tous les messages
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des messages récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       500:
 *         description: Erreur serveur
 */
messageRouter.get("/", verifyToken, messageController.getAllMessages);

/**
 * @swagger
 * /api/messages/{id}:
 *   get:
 *     summary: Obtenir un message par ID
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du message
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Message trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: Message non trouvé
 */
messageRouter.get("/:id", verifyToken, messageController.getMessageById);

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Créer un nouveau message
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       201:
 *         description: Message créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Données invalides
 */
messageRouter.post("/", verifyToken, messageController.createMessage);

/**
 * @swagger
 * /api/messages/{id}:
 *   delete:
 *     summary: Supprimer un message
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du message à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Message supprimé
 *       404:
 *         description: Message non trouvé
 */
messageRouter.delete("/:id", verifyToken, messageController.deleteMessage);

module.exports = messageRouter;
