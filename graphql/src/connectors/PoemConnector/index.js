import ModelConnector from '../ModelConnector';
import { Poem, PoemPref } from '../../database/models';
import { map, merge } from 'ramda';

class PoemConnector extends ModelConnector {
  constructor(config) {
    super({ modelName: 'Poem', ...config });
  }

  get = ({ id }) =>
    this.load({
      fn: () => Poem.eager('prefs').findById(id),
      name: 'get',
      key: id,
    });

  findOne = ({ select = ['*'], where, orderBy }) =>
    this.load({
      fn: () =>
        Poem.query()
          .findOne(...where)
          .select(...select)
          .orderBy(...orderBy),
      name: 'findOne',
      key: { where, orderBy },
    });

  getAll = ({ where, orderBy, limit }) =>
    this.load({
      fn: () =>
        where
          ? Poem.query()
              .eager('prefs')
              .where(...where)
              .orderBy(...orderBy)
              .limit(...limit)
          : Poem.query()
              .eager('prefs')
              .orderBy(...orderBy)
              .limit(...limit),
      name: 'getAll',
      key: { where, orderBy, limit },
    });

  getLibrary = () =>
    this.load({
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
      name: 'getLibrary',
      key: true,
    });

  addPrefs = ({ input }) =>
    this.load({
      fn: () => PoemPref.query().insert(merge({ userId: this.userId }, input)),
      name: 'addPrefs',
      key: input,
    });

  updatePrefs = ({ input }) =>
    this.load({
      fn: () =>
        PoemPref.query().patchAndFetchById(
          [this.userId, input.poemId],
          merge({ userId: this.userId }, input)
        ),
      name: 'updatePrefs',
      key: input,
    });
}

export default PoemConnector;
