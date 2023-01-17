'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlaylistSongs extends Model {
    static associate({Playlists, Songs}) {
      this.belongsTo(Playlists, {foreignKey: "playlistID"});
      this.belongsTo(Songs, {foreignKey: "songID"});
    }
  }
  PlaylistSongs.init({
    
  }, {
    sequelize,
    modelName: 'PlaylistSongs',
  });
  return PlaylistSongs;
};