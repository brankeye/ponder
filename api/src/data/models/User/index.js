import { Model } from '../model';

class User extends Model {
  static tableName = 'users';

  static relationMappings = {
    authorPrefs: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '../../AuthorInfo',
      join: {
        from: 'users.id',
        to: 'author_infos.user_id',
      },
    },
    poemPrefs: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '../../PoemInfo',
      join: {
        from: 'users.id',
        to: 'poem_infos.user_id',
      },
    },
  };
}

export default User;
