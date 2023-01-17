'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RecordLabels extends Model {
    static associate({Artists}) {
      this.hasMany(Artists, {foreignKey: "recordLabelID"});
    }
  }
  RecordLabels.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateFounded: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    headquarters: {
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
    sequelize,
    modelName: 'RecordLabels',
  });
  return RecordLabels;
};