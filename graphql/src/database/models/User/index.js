import { Model } from 'objection';
import AuthorPrefs from '../AuthorPrefs';
import PoemPrefs from '../PoemPrefs';

class User extends Model {
  static tableName = 'Users';

  static relationMappings = {
    authorPrefs: {
      relation: Model.HasManyRelation,
      modelClass: AuthorPrefs,
      join: {
        from: 'Users.id',
        to: 'AuthorPrefs.userId',
      },
    },
    poemPrefs: {
      relation: Model.HasManyRelation,
      modelClass: PoemPrefs,
      join: {
        from: 'Users.id',
        to: 'PoemPrefs.userId',
      },
    },
  };
}

export default User;
