'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('artistCollaborations', 
    [
      {collaborationID: 1, artistID: 6},
      {collaborationID: 1, artistID: 7},
      {collaborationID: 2, artistID: 8},
      {collaborationID: 2, artistID: 9},
      {collaborationID: 3, artistID: 1},
      {collaborationID: 3, artistID: 12}    
    ]
    , {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ArtistCollaborations', null, {});
  }
};
