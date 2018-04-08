import { Model } from 'objection';
import Poem from '../Poem';

class PoemPref extends Model {
  static get tableName() {
    return 'PoemPrefs';
  }

  static get idColumn() {
    return ['userId', 'poemId'];
  }

  static relationMappings = {
    poem: {
      relation: Model.BelongsToOneRelation,
      modelClass: Poem,
      join: {
        from: 'PoemPrefs.poemId',
        to: 'Poems.id',
      },
    },
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '../../User',
      join: {
        from: 'PoemPrefs.userId',
        to: 'Users.id',
      },
    },
  };
}

export default PoemPref;
