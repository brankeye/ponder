'use strict';
module.exports = (sequelize, DataTypes) => {
  var PoemInfo = sequelize.define(
    'PoemInfo',
    {
      inLibrary: DataTypes.BOOLEAN,
      isFavorite: DataTypes.BOOLEAN,
    },
    {}
  );
  PoemInfo.associate = function(models) {
    PoemInfo.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    PoemInfo.belongsTo(models.Poem, {
      foreignKey: 'poemId',
    });
  };
  return PoemInfo;
};
