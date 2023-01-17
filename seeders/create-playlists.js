'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('playlists', 
    [
      {name:"Study mix", createdAt: "2022-12-19", listenerID:4},
      {name:"The best of Bad Bunny", createdAt:"2022-12-19", listenerID:2},
      {name:"Christmas mix", listenerID:1},
      {name:"Relaxing music", createdAt:"2022-12-19", listenerID:3},
      {name:"Rock",  listenerID:5},
    ]
    , {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Playlists', null, {});
  }
};
