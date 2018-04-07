import { Model } from 'objection';
import AuthorPref from '../AuthorPref';
import PoemPref from '../PoemPref';

class User extends Model {
  static tableName = 'Users';

  static relationMappings = {
    authorPrefs: {
      relation: Model.HasManyRelation,
      modelClass: AuthorPref,
      join: {
        from: 'Users.id',
        to: 'AuthorPrefs.userId',
      },
    },
    poemPrefs: {
      relation: Model.HasManyRelation,
      modelClass: PoemPref,
      join: {
        from: 'Users.id',
        to: 'PoemPrefs.userId',
      },
    },
  };
}

export default User;
