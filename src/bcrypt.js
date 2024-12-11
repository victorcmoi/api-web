const bcrypt = require("bcrypt");
// Paramètres bcrypt pour le hashage, plus ce nombre est élevé plus le hash est sécurisé mais lent
require("dotenv").config({ path: require('path').resolve(__dirname, '../.env') });

const hashPassword = async (plainPassword) => {
  try {
    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

const verifyPassword = async (plainPassword, hashedPassword) => {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (error) {
    throw error;
  }
};

module.exports = { hashPassword, verifyPassword };
