import { Model } from 'objection';
import Author from '../Author';
import User from '../User';

class AuthorPref extends Model {
  static get tableName() {
    return 'AuthorPrefs';
  }

  static relationMappings = {
    author: {
      relation: Model.BelongsToOneRelation,
      modelClass: Author,
      join: {
        from: 'AuthorPrefs.authorId',
        to: 'Authors.id',
      },
    },
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'AuthorPrefs.userId',
        to: 'Users.id',
      },
    },
  };
}

export default AuthorPref;
