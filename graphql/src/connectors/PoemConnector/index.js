import ModelConnector from '../ModelConnector';
import { Poem, UserPoem } from '../../database/models';
import { map, merge } from 'ramda';

class PoemConnector extends ModelConnector {
  constructor(config) {
    super({ modelName: 'Poem', ...config });
  }

  get = this.load('get', {
    fn: ({ id }) =>
      Poem.query()
        .eager('author', 'prefs')
        .findById(id),
  });

  findOne = this.load('findOne', {
    fn: ({ select = ['*'], where, orderBy }) =>
      Poem.query()
        .eager('author', 'prefs')
        .findOne(...where)
        .filter({ select, orderBy }),
  });

  getAll = this.load('getAll', {
    fn: ({ select, where, orderBy, limit }) =>
      Poem.query()
        .eager('author', 'prefs')
        .filter({ select, where, orderBy, limit })
        .debug(),
  });

  getLibrary = this.load('getLibrary', {
    fn: () =>
      UserPoem.query()
        .eager('poem')
        .where('user_id', this.userId)
        .then(
          map(({ poem, ...rest }) => ({
            ...poem,
            ...rest,
          }))
        ),
  });

  addPrefs = this.load('addPrefs', {
    fn: ({ input }) =>
      UserPoem.query().insert(merge({ user_id: this.userId }, input)),
  });

  updatePrefs = this.load('updatePrefs', {
    fn: ({ input }) =>
      UserPoem.query().patchAndFetchById(
        [this.userId, input.poemId],
        merge({ user_id: this.userId }, input)
      ),
  });
}

export default PoemConnector;
