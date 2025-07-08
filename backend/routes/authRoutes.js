const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentification des utilisateurs
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - phone
 *               - password
 *               - username
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               username:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [buyer, farmer, admin]
 *               profile_image:
 *                 type: string
 *               producer_type:
 *                 type: string
 *               address:
 *                 type: string
 *               location:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     enum: [Point]
 *                   coordinates:
 *                     type: array
 *                     items:
 *                       type: number
 *     responses:
 *       201:
 *         description: Utilisateur enregistré
 *       400:
 *         description: Données invalides ou utilisateur déjà existant
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - password
 *             properties:
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie avec token
 *       401:
 *         description: Identifiants incorrects
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /api/auth/verify:
 *   get:
 *     summary: Vérifier le token JWT
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token valide
 *       401:
 *         description: Token manquant ou invalide
 */
router.get("/verify", authController.verifyToken);

module.exports = router;
