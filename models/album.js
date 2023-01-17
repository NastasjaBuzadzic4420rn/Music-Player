'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Albums extends Model {
    static associate({Artists, Collaborations, Songs}) {
      this.belongsTo(Artists, {foreignKey: "artistID"});
      this.belongsTo(Collaborations, {foreignKey: "collaborationID"});
      this.hasMany(Songs, {foreignKey: "albumID"});
    }
  }
  Albums.init({ 

    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Albums',
  });
  return Albums;
};