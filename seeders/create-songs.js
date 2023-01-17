'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('songs', 
      [
        {name:"Moscow Mule", song: "https://www.youtube.com/embed/p38WgakuYDo", createdAt: '2022-05-06', artistID: 1, albumID: 1},
        {name:"All I want for Christmas Is You", song: "https://www.youtube.com/embed/aAkMkVFwAoo", createdAt: '1994-10-29', artistID: 2, albumID: 5},
        {name:"Golden", song: "https://www.youtube.com/embed/P3cffdsEXXw", createdAt: '2019-10-26', artistID: 4, albumID: 4},
        {name:"Un Verano Sin Ti", song: "https://www.youtube.com/embed/REyv4cblksI", createdAt: '2022-05-06', artistID: 1, albumID: 1},
        {name:"Shirt", song: "https://www.youtube.com/embed/hdFDrjfW548", createdAt: '2022-10-28', artistID: 3, albumID: 3}
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Songs', null, {});
  }
};
