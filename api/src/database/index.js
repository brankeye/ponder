import { Model } from 'objection';
import Knex from 'knex';
import config from 'config';

export default {
  init: () => {
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

export { Author, AuthorInfo, Poem, PoemInfo, User } from './models';
