const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

// Génération du token JWT
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};

// Inscription
const registerUser = async (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ message: 'Username is required.' });
    }

    try {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists.' });
        }
        const user = await User.create({ username });
        const token = generateToken(user);
        res.status(201).json({ message: 'User registered successfully.', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error registering user.', error: err });
    }
};

// Connexion
const loginUser = async (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ message: 'Username is required.' });
    }
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const token = generateToken(user);
        res.status(200).json({ message: 'Login successful.', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error logging in.', error: err });
    }
};

module.exports = {
    registerUser,
    loginUser,
};
