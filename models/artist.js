'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artists extends Model {
    static associate({Songs, Albums, Podcasts, RecordLabels, ArtistCollaborations, Follows}) {
      this.hasMany(Songs, {foreignKey: "artistID"});
      this.hasMany(Albums, {foreignKey: "artistID"});
      this.hasOne(Podcasts, {foreignKey: "podcastID"});
      this.belongsTo(RecordLabels, {foreignKey: "recordLabelID"});
      this.hasMany(ArtistCollaborations, {foreignKey: "artistID"});
      this.hasMany(Follows, {foreignKey: "artistID"});
    }
  }
  Artists.init({ 

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isSinger: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
    // RecordLabelID: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true
    // }
    
  }, {
    sequelize,
    modelName: 'Artists',
  });
  return Artists;
};