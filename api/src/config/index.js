import dotenv from 'dotenv';
dotenv.config();

class Config {
  constructor() {
    const { NODE_ENV, PORT, HOST, DB_CONNECTION, OAUTH_ID } = process.env;

    if (NODE_ENV !== 'development') {
      this.prod = true;
    } else {
      this.dev = true;
    }
    this.port = PORT || 3100;
    this.host = HOST || 'localhost';
    this.dbConnection = DB_CONNECTION;
    this.oauthId = OAUTH_ID;
  }
}

export default new Config();
