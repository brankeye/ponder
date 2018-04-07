import { Model } from 'objection';

class Poems extends Model {
  static get tableName() {
    return 'Poems';
  }

  static relationMappings = {
    author: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '../../Author',
      join: {
        from: 'Poems.authorId',
        to: 'Authors.id',
      },
    },
  };
}

export default Poems;
