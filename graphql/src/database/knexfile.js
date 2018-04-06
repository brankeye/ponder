require('dotenv').config({ path: '../../.env' });

module.exports = {
  development: {
    client: 'postgresql',
    connection: process.env.DB_CONNECTION,
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  staging: {
    client: 'postgresql',
    connection: process.env.DB_CONNECTION,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: process.env.DB_CONNECTION,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
