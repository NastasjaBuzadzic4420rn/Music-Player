'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlists extends Model {
    static associate({Listeners, PlaylistSongs}) {
      this.belongsTo(Listeners, {foreignKey: "listenerID"});
      this.hasMany(PlaylistSongs, {foreignKey: "playlistID"});
    }
  }
  Playlists.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Playlists',
  });
  return Playlists;
};