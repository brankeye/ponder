'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'AuthorInfos',
      [
        {
          id: 1,
          userId: 1,
          authorId: 1,
          isFavorite: true,
          inLibrary: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          userId: 2,
          authorId: 2,
          isFavorite: true,
          inLibrary: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('AuthorInfos', null, {});
  },
};
