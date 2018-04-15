import { Model } from '../model';

class User extends Model {
  static tableName = 'users';

  static relationMappings = {
    authorPrefs: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '../../UserAuthor',
      join: {
        from: 'Users.id',
        to: 'user_authors.userId',
      },
    },
    poemPrefs: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '../../UserPoem',
      join: {
        from: 'users.id',
        to: 'user_poems.userId',
      },
    },
  };
}

export default User;
