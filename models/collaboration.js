'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Collaborations extends Model {

    static associate({Songs, Albums, Podcasts, ArtistCollaborations}) {
      this.hasMany(Songs, {foreignKey: "collaborationID"});
      this.hasMany(Albums, {foreignKey: "collaborationID"});
      this.hasOne(Podcasts, {foreignKey: "collaborationID"});
      this.hasMany(ArtistCollaborations, {foreignKey: "collaborationID"});

    }
  }
  Collaborations.init({

    name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Collaborations',
  });
  return Collaborations;
};