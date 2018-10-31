import { Model } from '../model';

class Author extends Model {
  static get tableName() {
    return 'authors';
  }

  static relationMappings = {
    poems: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '../../Poem',
      join: {
        from: 'authors.id',
        to: 'poems.author_id',
      },
    },
    info: {
      relation: Model.HasOneRelation,
      modelClass: __dirname + '../../AuthorInfo',
      join: {
        from: 'authors.id',
        to: 'author_infos.author_id',
      },
    },
  };
}

export default Author;
