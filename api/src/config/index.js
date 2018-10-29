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
  host: HOST || '0.0.0.0',
  dbConnection: DATABASE_URL,
  dbPoolMin: parseInt(DATABASE_POOL_MIN) || 2,
  dbPoolMax: parseInt(DATABASE_POOL_MAX) || 10,
};

export default config;
