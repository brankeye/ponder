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
        from: 'user_poems.poemId',
        to: 'poems.id',
      },
    },
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '../../User',
      join: {
        from: 'user_poems.userId',
        to: 'users.id',
      },
    },
  };
}

export default UserPoem;
