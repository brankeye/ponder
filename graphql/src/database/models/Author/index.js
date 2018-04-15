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
    prefs: {
      relation: Model.HasOneRelation,
      modelClass: __dirname + '../../UserAuthor',
      join: {
        from: 'authors.id',
        to: 'user_authors.author_id',
      },
    },
  };
}

export default Author;
