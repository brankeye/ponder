import { AsyncStorage } from 'react-native';

class Storage {
  getItem = async (key, cb) => JSON.parse(await AsyncStorage.getItem(item, cb));

  setItem = (key, item, cb) =>
    AsyncStorage.setItem(key, JSON.stringify(item), cb);

  removeItem = (key, cb) => AsyncStorage.removeItem(key, cb);
}

export default new Storage();
