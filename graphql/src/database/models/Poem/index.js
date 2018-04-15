import { Model } from '../model';

class Poems extends Model {
  static get tableName() {
    return 'poems';
  }

  static relationMappings = {
    author: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '../../Author',
      join: {
        from: 'poems.author_id',
        to: 'authors.id',
      },
    },
    prefs: {
      relation: Model.HasOneRelation,
      modelClass: __dirname + '../../UserPoem',
      join: {
        from: 'poems.id',
        to: 'user_poems.poem_id',
      },
    },
  };
}

export default Poems;
