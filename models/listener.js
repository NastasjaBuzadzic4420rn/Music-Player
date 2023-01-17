'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Listeners extends Model {
    static associate({Playlists, Reviews, Follows, ListenerPodcasts}) {
      this.hasMany(Playlists, {foreignKey: "listenerID"});
      this.hasMany(Reviews, {foreignKey: "listenerID"});
      this.hasMany(Follows, {foreignKey: "listenerID"});
      this.hasMany(ListenerPodcasts, {foreignKey: "listenerID"});
    }
  }
  Listeners.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Listeners',
  });
  return Listeners;
};