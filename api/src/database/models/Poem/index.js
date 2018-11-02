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
    info: {
      relation: Model.HasOneRelation,
      modelClass: __dirname + '../../PoemInfo',
      join: {
        from: 'poems.id',
        to: 'poem_infos.poem_id',
      },
    },
  };
}

export default Poems;
