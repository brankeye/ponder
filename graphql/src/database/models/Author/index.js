import { Model } from 'objection';

class Author extends Model {
  static get tableName() {
    return 'Authors';
  }

  static relationMappings = {
    poems: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '../../Poem',
      join: {
        from: 'Authors.id',
        to: 'Poems.authorId',
      },
    },
    prefs: {
      relation: Model.HasOneRelation,
      modelClass: __dirname + '../../AuthorPref',
      join: {
        from: 'Authors.id',
        to: 'AuthorPrefs.authorId',
      },
    },
  };
}

export default Author;
