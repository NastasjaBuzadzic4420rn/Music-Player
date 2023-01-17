'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('albums', 
    [
      {name:"Un Verano Sin Ti", createdAt: '2022-05-06', artistID:1},
      {name:"Harry's House", createdAt: '2022-05-20', artistID:4},
      {name:"SOS", createdAt: '2022-12-09', artistID:3},
      {name:"Fine Line", createdAt: '2019-12-13', artistID:4},
      {name:"Merry Christmas", createdAt: '1994-12-20', artistID:2}
    ]
    , {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Albums', null, {});
  }
};
