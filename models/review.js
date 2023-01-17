'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    static associate({Listeners, Songs}) {
      this.belongsTo(Listeners, {foreignKey: "listenerID"});
      this.belongsTo(Songs, {foreignKey: "songID"});
    }
  }
  Reviews.init({
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Reviews',
  });
  return Reviews;
};