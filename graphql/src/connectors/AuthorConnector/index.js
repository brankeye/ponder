import ModelConnector from '../ModelConnector';
import { Author, AuthorPref, Poem } from '../../database/models';
import { map, merge } from 'ramda';
class AuthorConnector extends ModelConnector {
  constructor(config) {
    super({ modelName: 'Author', ...config });
  }

  get = ({ id, offset = 0 }) =>
    this.load({
      fn: () =>
        Author.query()
          .eager('prefs')
          .findById(id)
          .offset(offset),
      name: 'get',
      key: id,
    });

  findOne = ({ where, orderBy }) =>
    this.load({
      fn: () =>
        Author.query()
          .findOne(...where)
          .orderBy(...orderBy),
      name: 'findOne',
      key: { where, orderBy },
    });

  getAll = ({ where, orderBy, limit }) =>
    this.load({
      fn: () =>
        where
          ? Author.query()
              .eager('prefs')
              .where(...where)
              .orderBy(...orderBy)
              .limit(...limit)
          : Author.query()
              .eager('prefs')
              .orderBy(...orderBy)
              .limit(...limit),
      name: 'getAll',
      key: { where, orderBy, limit },
    });

  getPoems = ({ id }) =>
    this.load({
      fn: () => Poem.query().where('authorId', id),
      name: 'getPoems',
      key: id,
    });

  getLibrary = () =>
    this.load({
      fn: () =>
        AuthorPref.query()
          .eager('author')
          .where('userId', this.userId)
          .then(
            map(({ author, ...rest }) => ({
              ...author,
              ...rest,
            }))
          ),
      name: 'getLibrary',
      key: true,
    });

  addPrefs = ({ input }) =>
    this.load({
      fn: () =>
        AuthorPref.query().insert(merge({ userId: this.userId }, input)),
      name: 'addPrefs',
      key: input,
    });

  updatePrefs = ({ input }) =>
    this.load({
      fn: () =>
        AuthorPref.query().patchAndFetchById(
          [this.userId, input.authorId],
          merge({ userId: this.userId }, input)
        ),
      name: 'updatePrefs',
      key: input,
    });

  updateLibrary;
}

export default AuthorConnector;
