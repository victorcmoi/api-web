const express = require('express');
const router = express.Router();
const courtController = require('../controllers/courtController');

/**
 * @swagger
 * tags:
 *   name: Courts
 *   description: Gestion des terrains de badminton
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Court:
 *       type: object
 *       required:
 *         - name
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *           description: Identifiant unique du terrain
 *         name:
 *           type: string
 *           description: Nom du terrain
 *         status:
 *           type: string
 *           description: Statut du terrain (e.g., "available", "unavailable")
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création du terrain
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Dernière mise à jour du terrain
 *       example:
 *         id: 1
 *         name: "A"
 *         status: "available"
 *         createdAt: "2024-12-01T12:00:00Z"
 *         updatedAt: "2024-12-01T12:00:00Z"
 */

/**
 * @swagger
 * /courts:
 *   get:
 *     summary: Récupérer tous les terrains
 *     tags: [Courts]
 *     responses:
 *       200:
 *         description: Liste des terrains.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Court'
 */
router.get('/', courtController.getCourts);

/**
 * @swagger
 * /courts/{id}:
 *   get:
 *     summary: Récupérer un terrain spécifique par son ID
 *     tags: [Courts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du terrain
 *     responses:
 *       200:
 *         description: Terrain trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Court'
 *       404:
 *         description: Terrain non trouvé
 */
router.get('/:id', courtController.getCourtById);

/**
 * @swagger
 * /courts:
 *   post:
 *     summary: Ajouter un nouveau terrain
 *     tags: [Courts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom du terrain
 *               status:
 *                 type: string
 *                 description: Statut du terrain (e.g., "available", "unavailable")
 *             example:
 *               name: "B"
 *               status: "available"
 *     responses:
 *       201:
 *         description: Terrain créé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Court'
 *       400:
 *         description: Erreur de validation.
 */
router.post('/', courtController.createCourt);

module.exports = router;