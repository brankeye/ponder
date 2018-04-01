'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    'User',
    {
      email: DataTypes.STRING,
      oauthId: DataTypes.STRING,
    },
    {}
  );
  User.associate = function(models) {
    User.hasMany(models.AuthorInfo, {
      foreignKey: 'userId',
      as: 'authorInfos',
    });
    User.hasMany(models.PoemInfo, {
      foreignKey: 'userId',
      as: 'poemInfos',
    });
  };
  return User;
};
