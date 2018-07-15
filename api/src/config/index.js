// @flow

import dotenv from 'dotenv';
dotenv.config();

const { NODE_ENV, PORT, HOST, DB_CONNECTION, OAUTH_ID } = process.env;

export type Config = {
  dev: boolean,
  prod: boolean,
  port: number,
  host: string,
  dbConnection: ?string,
  oauthId: ?string,
};

const config: Config = {
  dev: NODE_ENV === 'development',
  prod: NODE_ENV === 'production',
  port: parseInt(PORT) || 3100,
  host: HOST || 'localhost',
  dbConnection: DB_CONNECTION,
  oauthId: OAUTH_ID,
};

export default config;
