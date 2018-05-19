import { AsyncStorage } from 'react-native';
import { Buffer } from 'buffer';

class Auth {
  key = 'oauth';

  saveToken = async token =>
    await AsyncStorage.setItem(
      this.key,
      JSON.stringify(this.encodeToken(token))
    );

  getToken = async () => {
    const token = await AsyncStorage.getItem(this.key);
    return token ? JSON.parse(token) : null;
  };

  encodeToken = token => Buffer.from(JSON.stringify(token)).toString('base64');
}

export default new Auth();
