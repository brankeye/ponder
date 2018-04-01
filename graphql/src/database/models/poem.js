module.exports = (sequelize, DataTypes) => {
  const Poem = sequelize.define(
    'Poem',
    {
      title: { type: DataTypes.STRING, allowNull: false },
      teaser: { type: DataTypes.STRING, allowNull: false },
      lines: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
      },
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
