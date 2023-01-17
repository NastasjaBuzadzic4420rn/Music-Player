'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('listeners', 
    [
      {name:"Kabir Rush", age:"33", country: "India", password: "1234"},
      {name:"Rhonda Flores", age:"45", country: "United States", password: "1234"},
      {name:"Malaika Velasquez", age:"24", country: "Mexico", password: "1234"},
      {name:"Bronwyn Castro", age:"22", country: "United States", password: "1234"},
      {name:"Salma England", age:"27", country: "Netherlands", password: "1234"}
      
    ]
    , {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Listeners', null, {});
  }
};
