'use strict';

let data = require('../data');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('PoemInfos', data.poemInfos, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PoemInfos', null, {});
  },
};
