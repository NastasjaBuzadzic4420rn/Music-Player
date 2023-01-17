'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('artists', 
    [
      {name:"Bad Bunny", isSinger:true, recordLabelID: 2, password: "1234"},
      {name:"Mariah Carey", isSinger:true, recordLabelID: 3, password: "1234"},
      {name:"SZA", isSinger:true, recordLabelID: 2, password: "1234"},
      {name:"Harry Styles", isSinger:true, recordLabelID: 5, password: "1234"},
      {name:"Joe Rogan", isSinger:false, password: "1234"},
      {name:"Charles Bryant", isSinger:false, password: "1234"},
      {name:"Josh Clark", isSinger:false, password: "1234"},
      {name:"Ashley Flowers", isSinger:false, password: "1234"},
      {name:"Brit Prawat", isSinger:false, password: "1234"},
      {name:"Michael Barbaro", isSinger:false, password: "1234"},
      {name:"Benjamin Shapiro ", isSinger:false, password: "1234"},
      {name:"Bomba Estereo ", isSinger:true, password: "1234"}    
    ]
    , {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Artists', null, {});
  }
};
