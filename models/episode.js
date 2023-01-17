'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Episodes extends Model {
    static associate({Podcasts}) {
      this.belongsTo(Podcasts, {foreignKey: "podcastID"});
    }
  }
  Episodes.init({

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    guest: {
        type: DataTypes.STRING,
        allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Episodes',
   
  });
  return Episodes;
};