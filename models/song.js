'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Songs extends Model {
    static associate({Reviews, Artists, Albums, Collaborations, PlaylistSongs}) {
      this.hasMany(Reviews, {foreignKey: "songID"});
      this.hasMany(PlaylistSongs, {foreignKey: "songID"});
      this.belongsTo(Artists, {foreignKey: "artistID"});
      this.belongsTo(Albums, {foreignKey: "albumID"});
      this.belongsTo(Collaborations, {foreignKey: "collaborationID"});
    }
  }
  Songs.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    song: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Songs',
  });
  return Songs;
};