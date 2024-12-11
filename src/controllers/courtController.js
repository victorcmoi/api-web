const { Court } = require('../models');

// Ajouter un terrain
exports.createCourt = async (req, res) => {
    try {
        const { name, status } = req.body;

        const existingCourt = await Court.findOne({ where: { name } });
        if (existingCourt) {
            return res.status(400).json({ message: 'A court with this name already exists' });
        }

        const newCourt = await Court.create({ name, status });
        res.status(201).json(newCourt);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

// Récupérer tous les terrains
exports.getCourts = async (req, res) => {
    try {
        const courts = await Court.findAll();
        res.json(courts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fonction pour récupérer un terrain via son ID
exports.getCourtById = async (req, res) => {
    try {
        const { id } = req.params;
        const court = await Court.findByPk(id);

        if (!court) {
            return res.status(404).json({ message: 'Court not found' });
        }

        res.status(200).json(court);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
};