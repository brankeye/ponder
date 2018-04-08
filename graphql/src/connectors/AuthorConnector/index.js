import ModelConnector from '../ModelConnector';
import { Author, AuthorPref } from '../../database/models';
import { map, merge } from 'ramda';

class AuthorConnector extends ModelConnector {
  constructor(config) {
    super({ modelName: 'Author', ...config });
  }

  get = id =>
    this.load({
      fn: () =>
        Author.query()
          .eager('prefs')
          .findById(id),
      name: 'get',
      key: id,
    });

  getAll = (limit, offset) =>
    this.load({
      fn: () =>
        Author.query()
          .eager('prefs')
          .limit(limit)
          .offset(offset),
      name: 'getAll',
      key: { limit, offset },
    });

  getPoems = id =>
    this.load({
      fn: () => this.get(id).then(author => author.$relatedQuery('poems')),
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

  addPrefs = prefs =>
    this.load({
      fn: () =>
        AuthorPref.query().insert(merge({ userId: this.userId }, prefs)),
      name: 'addPrefs',
      key: prefs,
    });

  updatePrefs = prefs =>
    this.load({
      fn: () =>
        AuthorPref.query().patchAndFetchById(
          [this.userId, prefs.authorId],
          merge({ userId: this.userId }, prefs)
        ),
      name: 'updatePrefs',
      key: prefs,
    });

  updateLibrary;
}

export default AuthorConnector;
