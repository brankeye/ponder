import ModelConnector from '../ModelConnector';
import { Poem, PoemPref } from '../../database/models';
import { map, merge } from 'ramda';

class PoemConnector extends ModelConnector {
  constructor(config) {
    super({ modelName: 'Poem', ...config });
  }

  get = this.load('get', {
    fn: ({ id }) => Poem.eager('author', 'prefs').findById(id),
  });

  findOne = this.load('findOne', {
    fn: ({ select = ['*'], where, orderBy }) =>
      Poem.query()
        .eager('author', 'prefs')
        .findOne(...where)
        .select(...select)
        .orderBy(...orderBy),
  });

  getAll = this.load('getAll', {
    fn: ({ where, orderBy, limit }) =>
      Poem.query()
        .eager('author', 'prefs')
        .filter({ where, orderBy, limit }),
  });

  getLibrary = this.load('getLibrary', {
    fn: () =>
      PoemPref.query()
        .eager('poem')
        .where('userId', this.userId)
        .then(
          map(({ poem, ...rest }) => ({
            ...poem,
            ...rest,
          }))
        ),
  });

  addPrefs = this.load('addPrefs', {
    fn: ({ input }) =>
      PoemPref.query().insert(merge({ userId: this.userId }, input)),
  });

  updatePrefs = this.load('updatePrefs', {
    fn: ({ input }) =>
      PoemPref.query().patchAndFetchById(
        [this.userId, input.poemId],
        merge({ userId: this.userId }, input)
      ),
  });
}

export default PoemConnector;
