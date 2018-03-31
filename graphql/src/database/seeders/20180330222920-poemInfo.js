'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'PoemInfos',
      [
        {
          id: 1,
          userId: 1,
          poemId: 1,
          isFavorite: true,
          inLibrary: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          userId: 2,
          poemId: 2,
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
    return queryInterface.bulkDelete('PoemInfos', null, {});
  },
};
