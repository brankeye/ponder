// @flow

import dotenv from 'dotenv';
dotenv.config();

const { NODE_ENV, API_PORT, HOST, POSTGRES_URL } = process.env;

export type Config = {
  dev: boolean,
  prod: boolean,
  port: number,
  host: string,
  dbConnection: ?string,
};

const config: Config = {
  dev: NODE_ENV === 'development',
  prod: NODE_ENV === 'production',
  port: parseInt(API_PORT) || 3100,
  host: HOST || 'localhost',
  dbConnection: POSTGRES_URL,
};

export default config;
