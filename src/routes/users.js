const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestion des utilisateurs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
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
 *           description: Date de dernière mise à jour de l'utilisateur
 *       example:
 *         id: 1
 *         username: "johndoe"
 *         createdAt: "2024-12-01T12:00:00Z"
 *         updatedAt: "2024-12-10T14:30:00Z"
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Liste de tous les utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/', userController.getAllUsers);

module.exports = router;
