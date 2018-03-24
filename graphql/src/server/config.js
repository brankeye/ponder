import dotenv from 'dotenv';
dotenv.config();

class Config {
  constructor() {
    const { PORT, } = process.env;

    this.port = PORT;
  }
}

export default new Config();
