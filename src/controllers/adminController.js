const { Admin } = require("../models");
const { Court } = require("../models");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {  verifyPassword } = require("../bcrypt");

// Génération du token JWT
const generateToken = (admin) => {
  return jwt.sign(
      { id: admin.id, pseudo: admin.pseudo },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// Login admin
const loginAdmin = async (req, res) => {
  if (!req.body.pseudo || !req.body.password) {
    return res.status(400).json({ msg: "Pseudo and Password are required" });
  }
  try {
    // Trouver l'admin
    const admin = await Admin.findOne({
      where: {
        pseudo: req.body.pseudo,
      },
    });

    if (!admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await verifyPassword(req.body.password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid password" });
    }

    // Authentifié, signer et délivrer un jwt
    const token = generateToken(admin);
    res.status(200).json({ message: 'Login successful.', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Loggin in", error });
  }
};

// Modifier le statut d'un cours
const changeCourtStatus = async (req, res) => {
  try {
    const courtId = req.params.id;
    console.log(courtId);
    const court = await Court.findByPk(courtId);
    if (!court) {
      return res.status(404).json({ message: "Court not found" });
    }
    court.status = req.body.status;
    await court.save();
    res.status(200).json({ message: "Court status updated successfully", court });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating court status", error });
  }
}

module.exports = {
  loginAdmin,
  changeCourtStatus,
};