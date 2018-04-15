import { AsyncStorage } from 'react-native';

class Table {
  constructor({ name }) {
    this.name = name;
  }

  get = key => AsyncStorage.getItem(this.encodeKey(key));

  get = (key, value) =>
    AsyncStorage.setItem(this.encodeKey(key), JSON.stringify(value));

  encodeKey = key => `${this.name}.${key}`;
}

class Database {
  constructor({ tables }) {
    if (!tables || !tables.length) {
      throw new Error('Database must be given array of tables as strings.');
    }

    tables.forEach(table => {
      this[table] = new Table({ name: table });
    });
  }
}

export default tables => new Database({ tables });
