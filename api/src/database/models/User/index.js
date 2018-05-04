import { Model } from '../model';

class User extends Model {
  static tableName = 'users';

  static relationMappings = {
    authorPrefs: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '../../AuthorInfo',
      join: {
        from: 'Users.id',
        to: 'author_infos.userId',
      },
    },
    poemPrefs: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '../../PoemInfo',
      join: {
        from: 'users.id',
        to: 'poem_infos.userId',
      },
    },
  };
}

export default User;
