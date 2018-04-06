import { Model } from 'objection';
import Author from '../Author';

class Poems extends Model {
  static get tableName() {
    return 'Poems';
  }

  static relationMappings = {
    author: {
      relation: Model.BelongsToOneRelation,
      modelClass: Author,
      join: {
        from: 'Poems.authorId',
        to: 'Authors.id',
      },
    },
  };
}

export default Poems;
