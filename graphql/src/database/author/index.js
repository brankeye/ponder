import sequelize, { Sequelize } from '../sequelize';

export default sequelize.define(
  'Author',
  {
    name: { type: Sequelize.STRING, allowNull: false },
  },
  {}
);
