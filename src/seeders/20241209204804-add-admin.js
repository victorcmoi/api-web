'use strict';

require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const { hashPassword } = require('../bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const adminPassword = process.env.ADMIN_PASSWORD;
    const hashedPassword = await hashPassword(adminPassword);
    // Données initiales
    await queryInterface.bulkInsert('Admin', [
      {
        pseudo: 'admybad',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admin', null, {});
  }
};
