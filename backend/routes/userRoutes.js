const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtenir tous les utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get("/", userController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtenir un utilisateur par ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get("/:id", userController.getUserById);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - email
 *             properties:
 *               nom:
 *                 type: string
 *               email:
 *                 type: string
 *               motDePasse:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Données invalides
 */
router.post("/", userController.createUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Modifier un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à modifier
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Utilisateur modifié
 *       404:
 *         description: Utilisateur non trouvé
 */
router.put("/:id", userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 *       404:
 *         description: Utilisateur non trouvé
 */
router.delete("/:id", userController.deleteUser);

module.exports = router;
