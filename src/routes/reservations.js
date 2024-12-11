const express = require('express');
const router = express.Router();
const { createReservation, getUserReservations, deleteReservation } = require('../controllers/reservationController');
const authenticateUser = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Gestion des réservations de terrains
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Identifiant unique de la réservation
 *         userId:
 *           type: integer
 *           description: Identifiant de l'utilisateur ayant effectué la réservation
 *         courtId:
 *           type: integer
 *           description: Identifiant du terrain réservé
 *         date:
 *           type: string
 *           format: date
 *           description: Date de la réservation
 *         timeSlot:
 *           type: integer
 *           description: Créneau horaire de la réservation (entre 1 et 16 inclus)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création de la réservation
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date de dernière mise à jour de la réservation
 *       example:
 *         id: 1
 *         userId: 2
 *         courtId: 1
 *         date: "2024-12-10"
 *         timeSlot: 10
 *         createdAt: "2024-12-01T12:00:00Z"
 *         updatedAt: "2024-12-01T12:00:00Z"
 */

/**
 * @swagger
 * /reservations:
 *   post:
 *     summary: Créer une nouvelle réservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courtName
 *               - date
 *               - timeSlot
 *             properties:
 *               courtName:
 *                 type: string
 *                 description: Nom du terrain à réserver
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date de la réservation (dans la semaine en cours, sauf dimanche)
 *               timeSlot:
 *                 type: integer
 *                 description: Créneau horaire de la réservation (1 à 16 inclus)
 *             example:
 *               courtName: "Court A"
 *               date: "2024-12-10"
 *               timeSlot: 10
 *     responses:
 *       201:
 *         description: Réservation créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Erreur de validation (date hors semaine en cours, dimanche ou créneau non valide)
 *       404:
 *         description: Terrain non trouvé ou non disponible
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/', authenticateUser, createReservation);

/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Récupérer les réservations de l'utilisateur connecté
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des réservations de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 *       401:
 *         description: Non autorisé (token manquant ou invalide)
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/', authenticateUser, getUserReservations);

/**
 * @swagger
 * /reservations/{reservationId}:
 *   delete:
 *     summary: Supprimer une réservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reservationId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la réservation à supprimer
 *     responses:
 *       200:
 *         description: Réservation supprimée avec succès
 *       403:
 *         description: Non autorisé à supprimer cette réservation
 *       404:
 *         description: Réservation non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
router.delete('/:reservationId', authenticateUser, deleteReservation);

module.exports = router;
