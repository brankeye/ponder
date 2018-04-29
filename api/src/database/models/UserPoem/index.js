import { Model } from '../model';

class UserPoem extends Model {
  static get tableName() {
    return 'user_poems';
  }

  static get idColumn() {
    return ['user_id', 'poem_id'];
  }

  static relationMappings = {
    poem: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '../../Poem',
      join: {
        from: 'user_poems.poem_id',
        to: 'poems.id',
      },
    },
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '../../User',
      join: {
        from: 'user_poems.user_id',
        to: 'users.id',
      },
    },
  };
}

export default UserPoem;
