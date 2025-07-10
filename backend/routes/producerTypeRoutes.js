const express = require("express");
const producerTypeController = require("../controllers/producerTypeController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ProducerTypes
 *   description: Gestion des types de producteurs
 */

/**
 * @swagger
 * /api/producer-types:
 *   get:
 *     summary: Obtenir tous les types de producteurs
 *     tags: [ProducerTypes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des types de producteurs récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProducerType'
 *       500:
 *         description: Erreur serveur
 */
router.get("/", verifyToken, producerTypeController.getAllProducerTypes);

/**
 * @swagger
 * /api/producer-types/{id}:
 *   get:
 *     summary: Obtenir un type de producteur par ID
 *     tags: [ProducerTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du type de producteur
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Type de producteur trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProducerType'
 *       404:
 *         description: Type non trouvé
 */
router.get("/:id", verifyToken, producerTypeController.getProducerTypeById);

/**
 * @swagger
 * /api/producer-types:
 *   post:
 *     summary: Créer un nouveau type de producteur
 *     tags: [ProducerTypes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProducerType'
 *     responses:
 *       201:
 *         description: Type de producteur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProducerType'
 *       400:
 *         description: Données invalides
 */
router.post("/", verifyToken, producerTypeController.createProducerType);

/**
 * @swagger
 * /api/producer-types/{id}:
 *   put:
 *     summary: Modifier un type de producteur
 *     tags: [ProducerTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du type à modifier
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProducerType'
 *     responses:
 *       200:
 *         description: Type mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProducerType'
 *       404:
 *         description: Type non trouvé
 */
router.put("/:id", verifyToken, producerTypeController.updateProducerType);

/**
 * @swagger
 * /api/producer-types/{id}:
 *   delete:
 *     summary: Supprimer un type de producteur
 *     tags: [ProducerTypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du type à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Type supprimé avec succès
 *       404:
 *         description: Type non trouvé
 */
router.delete("/:id", verifyToken, producerTypeController.deleteProducerType);

module.exports = router;
