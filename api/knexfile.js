module.exports = {
  local: {
    client: 'postgresql',
    connection: process.env.DATABASE_CONNECTION,
    pool: {
      min: parseInt(process.env.DATABASE_POOL_MIN),
      max: parseInt(process.env.DATABASE_POOL_MAX),
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations',
    },
    seeds: {
      directory: './src/database/seeds',
    },
  },
  dev: {
    client: 'postgresql',
    connection: process.env.DATABASE_CONNECTION,
    pool: {
      min: parseInt(process.env.DATABASE_POOL_MIN),
      max: parseInt(process.env.DATABASE_POOL_MAX),
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations',
    },
    seeds: {
      directory: './src/database/seeds',
    },
  },
  prd: {
    client: 'postgresql',
    connection: process.env.DATABASE_CONNECTION,
    pool: {
      min: parseInt(process.env.DATABASE_POOL_MIN),
      max: parseInt(process.env.DATABASE_POOL_MAX),
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/database/migrations',
    },
    seeds: {
      directory: './src/database/seeds',
    },
  },
};
