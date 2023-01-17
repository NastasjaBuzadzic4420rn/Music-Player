'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArtistCollaborations extends Model {
    static associate({Artists , Collaborations}) {
      this.belongsTo(Artists, {foreignKey: "artistID"});
      this.belongsTo(Collaborations, {foreignKey: "collaborationID"});
    }
  }
  ArtistCollaborations.init({ 

  }, {
    sequelize,
    modelName: 'ArtistCollaborations',
  });
  return ArtistCollaborations;
};