import { Model } from '../model';

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
    prefs: {
      relation: Model.HasOneRelation,
      modelClass: __dirname + '../../PoemPref',
      join: {
        from: 'Poems.id',
        to: 'PoemPrefs.poemId',
      },
    },
  };
}

export default Poems;
