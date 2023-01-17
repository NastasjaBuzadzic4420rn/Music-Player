'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('podcasts', 
    [
      {name: "Stuff You Should Know", collaborationID: 1},
      {name: "Crime Junkie", collaborationID: 2},
      {name: "The Daily", artistID: 10},
      {name: "The Joe Rogan Experience", artistID: 5},
      {name: "The Ben Shapiro Show", artistID: 11},
    ]
    , {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Podcasts', null, {});
  }
};
