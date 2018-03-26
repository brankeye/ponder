module.exports = (sequelize, DataTypes) => {
  const Poem = sequelize.define(
    'Poem',
    {
      title: { type: DataTypes.STRING, allowNull: false },
      teaser: { type: DataTypes.STRING, allowNull: false },
    },
    {}
  );
  Poem.associate = function(models) {
    Poem.belongsTo(models.Author, {
      foreignKey: 'authorId',
    });
  };
  return Poem;
};
