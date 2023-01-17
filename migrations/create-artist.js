'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Artists', {
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
      isSinger: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      recordLabelID: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Artists');
  }
};