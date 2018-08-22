import dotenv from 'dotenv';
dotenv.config();

class Config {
  constructor() {
    const { NODE_ENV, GRAPHQL_PORT, HOST, API_URL } = process.env;

    if (NODE_ENV !== 'development') {
      this.prod = true;
    } else {
      this.dev = true;
    }
    this.port = parseInt(GRAPHQL_PORT) || 3000;
    this.host = HOST || 'localhost';
    this.api = API_URL;
  }
}

export default new Config();
