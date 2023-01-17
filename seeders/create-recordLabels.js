'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('recordLabels', 
    [
      {name:"Abbey Road Studios", dateFounded:"1931", headquarters: "London, United Kingdom"},
      {name:"RIMAS ENTERTAINMENT LLC", dateFounded:"2014", headquarters: "Puerto Rico"},
      {name:"Virgin Records", dateFounded:"1972", headquarters: "Los Angeles, California, United States"},
      {name:"Columbia Records", dateFounded:"1887", headquarters: "New York, New York, United States"},
      {name:"Top Dawg Entertainment", dateFounded:"2004", headquarters: "Carson, California, United States"},
    ]
    , {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RecordLabels', null, {});
  }
};
