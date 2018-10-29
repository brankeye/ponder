const { NODE_ENV, GRAPHQL_PORT, HOST, API_URL } = process.env;

const config = {
  dev: NODE_ENV === 'development',
  prod: NODE_ENV === 'production',
  api: API_URL,
  host: HOST || '0.0.0.0',
  port: parseInt(GRAPHQL_PORT) || 3000,
};

export default config;
