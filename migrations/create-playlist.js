'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Playlists', {
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
      listenerID: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Playlists');
  }
};