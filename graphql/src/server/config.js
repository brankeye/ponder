import dotenv from 'dotenv';
dotenv.config();

class Config {
  constructor() {
    const { NODE_ENV, PORT, HOST, DB_CONN_URI } = process.env;

    if (NODE_ENV !== 'development') {
      this.prod = true;
    } else {
      this.dev = true;
    }
    this.port = PORT || 3000;
    this.host = HOST || 'localhost';
    this.dbConnUri = DB_CONN_URI;
  }
}

export default new Config();
