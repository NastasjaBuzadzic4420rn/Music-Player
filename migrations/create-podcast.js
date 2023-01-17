'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Podcasts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      updatedAt: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      collaborationID: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      artistID: {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Podcasts');
  }
};