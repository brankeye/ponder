import dotenv from 'dotenv';
dotenv.config();

class Config {
  constructor() {
    const {
      NODE_ENV,
      PORT,
      HOST,
      PONDER_API,
      OAUTH_ID,
      CLIENT_ID,
    } = process.env;

    if (NODE_ENV !== 'development') {
      this.prod = true;
    } else {
      this.dev = true;
    }
    this.port = PORT || 3000;
    this.host = HOST || 'localhost';
    this.api = PONDER_API;
    this.oauthId = OAUTH_ID;
    this.clientId = CLIENT_ID;
  }
}

export default new Config();
