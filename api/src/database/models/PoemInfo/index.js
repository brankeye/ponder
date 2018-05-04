import { Model } from '../model';

class PoemInfo extends Model {
  static get tableName() {
    return 'poem_infos';
  }

  static get idColumn() {
    return ['user_id', 'poem_id'];
  }

  static relationMappings = {
    poem: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '../../Poem',
      join: {
        from: 'poem_infos.poem_id',
        to: 'poems.id',
      },
    },
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '../../User',
      join: {
        from: 'poem_infos.user_id',
        to: 'users.id',
      },
    },
  };
}

export default PoemInfo;
