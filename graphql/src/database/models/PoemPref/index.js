import { Model } from 'objection';
import Poem from '../Poem';
import User from '../User';

class PoemPref extends Model {
  static get tableName() {
    return 'PoemPrefs';
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
      modelClass: User,
      join: {
        from: 'PoemPrefs.userId',
        to: 'Users.id',
      },
    },
  };
}

export default PoemPref;
