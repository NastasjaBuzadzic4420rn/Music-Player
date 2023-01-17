'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('playlistSongs', 
    [
      {songID:1, playlistID: 1},
      {songID:5, playlistID: 1},
      {songID:1, playlistID: 2},
      {songID:4, playlistID: 2},
      {songID:2, playlistID: 3},
      
    ]
    , {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PlaylistSongs', null, {});
  }
};