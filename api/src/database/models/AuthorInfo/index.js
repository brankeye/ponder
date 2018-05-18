import { Model } from '../model';

class AuthorInfo extends Model {
  static get tableName() {
    return 'author_infos';
  }

  static get idColumn() {
    return ['user_id', 'author_id'];
  }

  static relationMappings = {
    author: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '../../Author',
      join: {
        from: 'author_infos.author_id',
        to: 'authors.id',
      },
    },
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '../../User',
      join: {
        from: 'author_infos.user_id',
        to: 'users.id',
      },
    },
  };
}

export default AuthorInfo;
