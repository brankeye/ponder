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
    // associations can be defined here
  };
  return AuthorInfo;
};
