'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RecordLabels', {
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
      dateFounded: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      headquarters: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RecordLabels');
  }
};