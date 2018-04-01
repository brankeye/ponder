'use strict';

let data = require('../data');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Poems', data.poems, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Poems', null, {});
  },
};
