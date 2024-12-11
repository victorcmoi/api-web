'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Données des terrains
    await queryInterface.bulkInsert('Courts', [
      {
        name: 'A',
        status: 'available',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'B',
        status: 'available',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'C',
        status: 'available',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'D',
        status: 'available',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Courts', null, {});
  }
};
