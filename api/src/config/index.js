const {
  NODE_ENV,
  API_PORT,
  HOST,
  DATABASE_URL,
  DATABASE_POOL_MIN,
  DATABASE_POOL_MAX,
} = process.env;

const config = {
  dev: NODE_ENV === 'development',
  prod: NODE_ENV === 'production',
  port: parseInt(API_PORT) || 3100,
  host: HOST || 'localhost',
  dbConnection: DATABASE_URL,
  dbPoolMin: parseInt(DATABASE_POOL_MIN),
  dbPoolMax: parseInt(DATABASE_POOL_MAX),
};

export default config;
