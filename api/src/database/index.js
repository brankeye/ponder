import { Model } from 'objection';
import Knex from 'knex';
import config from 'config';

const database = {
  setup: () => {
    const knex = Knex({
      client: 'pg',
      useNullAsDefault: true,
      connection: config.dbConnection,
      pool: {
        min: config.dbPoolMin,
        max: config.dbPoolMax,
      },
    });
    Model.knex(knex);
  },
};

export default database;

export { Author, AuthorInfo, Poem, PoemInfo, User } from './models';
