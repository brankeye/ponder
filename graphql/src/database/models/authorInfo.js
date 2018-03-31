'use strict';
module.exports = (sequelize, DataTypes) => {
  var AuthorInfo = sequelize.define(
    'AuthorInfo',
    {
      inLibrary: DataTypes.BOOLEAN,
      isFavorite: DataTypes.BOOLEAN,
    },
    {}
  );
  AuthorInfo.associate = function(models) {
    AuthorInfo.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    AuthorInfo.belongsTo(models.Poem, {
      foreignKey: 'authorId',
    });
  };
  return AuthorInfo;
};
