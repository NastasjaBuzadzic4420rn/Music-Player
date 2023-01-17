'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('episodes', 
    [
      {name:"#1908 - Erika Thompson", guest:"Erika Thompson", createdAt: '2022-12-08', podcastID:4},
      {name:"CONSPIRACY:Jonathan Luna", createdAt:'2022-12-12', podcastID:2},
      {name:"Interesting Origins of Everyday Phrases", createdAt:'2022-12-15', podcastID:1},
      {name:"Scenes from a Russian Draft Office", createdAt:'2022-12-15', podcastID:3},
      {name:"Ep.1625 - The Warnock Win", createdAt:'2022-12-07', podcastID:5}
    ]
    , {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Episodes', null, {});
  }
};
