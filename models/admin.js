'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admins extends Model {
    static associate() {

    }
  }
  Admins.init({ 

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Admins',
  });
  return Admins;
};