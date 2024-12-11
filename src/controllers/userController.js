const { User } = require('../models');

// Récupérer les utilisateurs
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

module.exports = {
    getAllUsers,
};
