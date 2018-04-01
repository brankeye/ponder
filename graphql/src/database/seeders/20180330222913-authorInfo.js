'use strict';

let data = require('../data');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('AuthorInfos', data.authorInfos, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('AuthorInfos', null, {});
  },
};
