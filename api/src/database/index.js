// @flow

import { Model } from 'objection';
import Knex from 'knex';
import config from 'config';

const database = {
  setup: () => {
    const knex = Knex({
      client: 'postgresql',
      useNullAsDefault: true,
      connection: config.dbConnection,
    });
    Model.knex(knex);
  },
};

export default database;

export { Author, AuthorInfo, Poem, PoemInfo, User } from './models';
