'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('collaborations', 
    [
      {name: "Charles Bryant & Josh Clark"},
      {name: "Ashley Flowers & Brit Prawat"},
      {name: "Bad Bunny y Bomba Estereo"}
    ]
    , {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Collaborations', null, {});
  }
};
