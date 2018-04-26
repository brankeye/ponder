import { Model } from '../model';

class UserAuthor extends Model {
  static get tableName() {
    return 'user_authors';
  }

  static get idColumn() {
    return ['user_id', 'author_id'];
  }

  static relationMappings = {
    author: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '../../Author',
      join: {
        from: 'user_authors.author_id',
        to: 'authors.id',
      },
    },
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '../../User',
      join: {
        from: 'user_authors.user_id',
        to: 'users.id',
      },
    },
  };
}

export default UserAuthor;
