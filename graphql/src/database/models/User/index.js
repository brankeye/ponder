import { Model } from '../model';

class User extends Model {
  static tableName = 'Users';

  static relationMappings = {
    authorPrefs: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '../../AuthorPref',
      join: {
        from: 'Users.id',
        to: 'AuthorPrefs.userId',
      },
    },
    poemPrefs: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '../../PoemPref',
      join: {
        from: 'Users.id',
        to: 'PoemPrefs.userId',
      },
    },
  };
}

export default User;
