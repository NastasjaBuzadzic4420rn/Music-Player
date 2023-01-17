'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('reviews', 
    [
      {rating: "1", listenerID: 1, songID: 5},
      {comment: "Can’t get enough of this", rating: "8", listenerID: 4, songID: 5},
      {comment: "This new album was well worth the wait", rating: "9", listenerID: 5, songID: 5},
      {rating: "3", listenerID: 1, songID: 2},
      {comment: "my love for this song will never end", rating: "10", listenerID: 3, songID: 3}

      
    ]
    , {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};