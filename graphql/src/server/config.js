import dotenv from 'dotenv';
dotenv.config();

class Config {
  constructor() {
    const { NODE_ENV, PORT, HOST, DB_URI, USER_ID } = process.env;

    if (NODE_ENV !== 'development') {
      this.prod = true;
    } else {
      this.dev = true;
    }
    this.port = PORT || 3000;
    this.host = HOST || 'localhost';
    this.dbUri = DB_URI;
    this.userId = USER_ID;
  }
}

export default new Config();
