'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('listenerPodcasts', 
    [
      {podcastID: 4, listenerID: 1},
      {podcastID: 3, listenerID: 2},
      {podcastID: 2, listenerID: 4},
      {podcastID: 5, listenerID: 4},
      {podcastID: 1, listenerID: 3}
    ]
    , {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ListenerPodcasts', null, {});
  }
};
