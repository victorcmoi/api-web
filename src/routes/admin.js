const express = require("express");
const router = express.Router();
const { loginAdmin, changeCourtStatus } = require("../controllers/adminController");
/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Gestion de l'admin
 */

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Se connecter en tant qu'admin
 *     tags: [Admin]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - pseudo
 *              - password
 *            properties:
 *              pseudo:
 *                type: string
 *                description: Pseudo de l'admin
 *              password:
 *                type: string
 *                description: Mot de passe de l'admin
 *          example:
 *            pseudo: "admin"
 *            password: "admin"
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
 *         description: Pseudo ou mot de passe non valide.
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/login', loginAdmin);

/**
 * @swagger
 * /admin/courts/{id}:
 *   put:
 *     summary: Modifier le statut d'un terrain
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du terrain à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 description: Nouveau statut du terrain
 *           example:
 *             status: "unavailable"
 *     responses:
 *       200:
 *         description: Statut du terrain modifié avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de succès
 *             example:
 *               message: "Court status updated successfully"
 *               court:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                      name:
 *                        type: string
 *                      status:
 *                        type: string
 *       401:
 *         description: Non autorisé (token manquant ou invalide)
 *       404:
 *         description: Terrain non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.put('/courts/:id', changeCourtStatus);

module.exports = router;
