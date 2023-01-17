'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follows extends Model {
    static associate({Listeners, Artists}) {
      this.belongsTo(Listeners, {foreignKey: "listenerID"});
      this.belongsTo(Artists, {foreignKey: "artistID"});
    }
  }
  Follows.init({

  }, {
    sequelize,
    modelName: 'Follows',
  });
  return Follows;
};