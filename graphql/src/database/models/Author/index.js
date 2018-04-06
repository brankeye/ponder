import { Model } from 'objection';
import Poem from '../Poem';

class Author extends Model {
  static get tableName() {
    return 'Authors';
  }

  static relationMappings = {
    poems: {
      relation: Model.HasManyRelation,
      modelClass: Poem,
      join: {
        from: 'Authors.id',
        to: 'Poems.authorId',
      },
    },
  };
}

export default Author;
