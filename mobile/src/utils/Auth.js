import Storage from './Storage';
import { Buffer } from 'buffer';

class Auth {
  key = 'oauth';

  saveToken = token => Storage.setItem(this.key, this.encodeToken(token));

  getToken = () => Storage.getItem(this.key);

  encodeToken = token => Buffer.from(JSON.stringify(token)).toString('base64');
}

export default new Auth();
