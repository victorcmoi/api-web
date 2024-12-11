const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   name: Authentification
 *   description: Gestion de l'inscription et de la connexion des utilisateurs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *       properties:
 *         id:
 *           type: integer
 *           description: Identifiant unique de l'utilisateur
 *         username:
 *           type: string
 *           description: Nom d'utilisateur
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création de l'utilisateur
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Dernière mise à jour de l'utilisateur
 *       example:
 *         id: 1
 *         username: "JeanDupont"
 *         createdAt: "2024-12-01T12:00:00Z"
 *         updatedAt: "2024-12-01T12:00:00Z"
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Inscrire un nouvel utilisateur
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nom d'utilisateur
 *             example:
 *               username: "JeanDupont"
 *     responses:
 *       201:
 *         description: Utilisateur inscrit avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de succès
 *                 token:
 *                   type: string
 *                   description: Token JWT pour authentifier les requêtes
 *             example:
 *               message: "User registered successfully."
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ..."
 *       400:
 *         description: Erreur de validation ou utilisateur déjà existant
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Connecter un utilisateur existant
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nom d'utilisateur
 *             example:
 *               username: "JeanDupont"
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT pour authentifier les requêtes
 *             example:
 *               message: "Login successful."
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Erreur de validation ou utilisateur introuvable
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/login', loginUser);

module.exports = router;