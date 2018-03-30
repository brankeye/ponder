'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    'User',
    {
      email: DataTypes.STRING,
    },
    {}
  );
  User.associate = function(models) {
    User.hasMany(models.AuthorInfo, {
      foreignKey: 'authorInfoId',
      as: 'authorInfos',
    });
    User.hasMany(models.PoemInfo, {
      foreignKey: 'poemInfoId',
      as: 'poemInfos',
    });
  };
  return User;
};
