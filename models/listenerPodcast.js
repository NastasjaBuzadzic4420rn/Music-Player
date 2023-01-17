'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ListenerPodcasts extends Model {
    static associate({Listeners, Podcasts}) {
      this.belongsTo(Listeners, {foreignKey: "listenerID"});
      this.belongsTo(Podcasts, {foreignKey: "podcastID"});
    }
  }
  ListenerPodcasts.init({


  }, {
    sequelize,
    modelName: 'ListenerPodcasts',
  });
  return ListenerPodcasts;
};