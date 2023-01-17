'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Podcasts extends Model {
    static associate({Artists, Collaborations, ListenerPodcasts}) {
      this.belongsTo(Artists, {foreignKey: "artistID"});
      this.belongsTo(Collaborations, {foreignKey: "collaborationID"});
      this.hasMany(ListenerPodcasts, {foreignKey: "podcastID"});
    }
  }
  Podcasts.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
    
  }, {
    sequelize,
    modelName: 'Podcasts',
  });
  return Podcasts;
};