const { Reservation, Court, User } = require('../models');
const { Op } = require('sequelize');

// Créer une réservation
const createReservation = async (req, res) => {
    const { courtName, date, timeSlot } = req.body;
    const userId = req.user.id;

    try {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const startOfWeek = new Date(today.setDate(today.getDate() - dayOfWeek + 1)); // Lundi
        const endOfWeek = new Date(today.setDate(today.getDate() - dayOfWeek + 7)); // Dimanche

        // Vérifie si la date est dans la semaine courante
        const reservationDate = new Date(date);
        if (
            reservationDate < startOfWeek.setHours(0, 0, 0, 0) ||
            reservationDate > endOfWeek.setHours(23, 59, 59, 999) ||
            reservationDate.getDay() === 0 // Dimanche
        ) {
            return res.status(400).json({ message: 'Reservations can only be made for the current week. ' });
        }

        // Vérifie si le créneau horaire est valide
        if (timeSlot > 16 || timeSlot < 1) {
            return res.status(400).json({ message: 'Time slot not valid. Try a value between 1 and 16.' });
        }

        // Recherche de la salle par nom
        const court = await Court.findOne({ where: { name: courtName } });
        if (!court) {
            return res.status(404).json({ message: `Court with name "${courtName}" not found` });
        }

        if (court.status !== 'available') {
            return res.status(400).json({ message: 'Court is not available' });
        }

        // Vérifie si le créneau est déjà réservé
        const existingReservation = await Reservation.findOne({
            where: { courtId: court.id, date, timeSlot },
        });

        if (existingReservation) {
            return res.status(400).json({ message: 'Time slot already booked' });
        }

        // Crée la réservation
        const reservation = await Reservation.create({
            userId,
            courtId: court.id,
            date,
            timeSlot,
        });

        res.status(201).json(reservation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating reservation', error });
    }
};

// Récupérer les réservations de l'utilisateur connecté
const getUserReservations = async (req, res) => {
    const userId = req.user.id;

    try {
        const reservations = await Reservation.findAll({
            where: { userId },
            include: [Court],
        });

        res.status(200).json(reservations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching reservations', error });
    }
};

// Supprimer une réservation
const deleteReservation = async (req, res) => {
    const userId = req.user.id;
    const { reservationId } = req.params;

    try {
        const reservation = await Reservation.findByPk(reservationId);

        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        if (reservation.userId !== userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this reservation' });
        }

        await reservation.destroy();

        res.status(200).json({ message: 'Reservation deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting reservation', error });
    }
};

module.exports = {
    createReservation,
    getUserReservations,
    deleteReservation,
};