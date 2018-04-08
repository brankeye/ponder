import { Model } from 'objection';
import Author from '../Author';

class AuthorPref extends Model {
  static get tableName() {
    return 'AuthorPrefs';
  }

  static get idColumn() {
    return ['userId', 'authorId'];
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
      modelClass: __dirname + '../../User',
      join: {
        from: 'AuthorPrefs.userId',
        to: 'Users.id',
      },
    },
  };
}

export default AuthorPref;
