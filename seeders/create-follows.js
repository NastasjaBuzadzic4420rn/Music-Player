'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('follows', 
    [
      {listenerID: 1, artistID: 5},
      {listenerID: 1, artistID: 2},
      {listenerID: 3, artistID: 4},
      {listenerID: 3, artistID: 1},
      {listenerID: 5, artistID: 3}
      
    ]
    , {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Follows', null, {});
  }
};
