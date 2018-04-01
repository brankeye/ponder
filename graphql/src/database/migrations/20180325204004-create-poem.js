'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Poems', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      authorId: {
        type: Sequelize.UUID,
        references: {
          model: 'Authors',
          key: 'id',
          as: 'authorId',
        },
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      teaser: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lines: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Poems');
  },
};
