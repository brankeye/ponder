import ModelConnector from '../ModelConnector';
import { Author, UserAuthor, Poem } from '../../database/models';
import { map, merge } from 'ramda';

class AuthorConnector extends ModelConnector {
  constructor(config) {
    super({ modelName: 'Author', ...config });
  }

  get = this.load('get', {
    fn: ({ id }) =>
      Author.query()
        .eager('prefs')
        .findById(id),
  });

  findOne = this.load('findOne', {
    fn: ({ select = ['*'], where, orderBy }) =>
      Author.query()
        .eager('prefs')
        .findOne(...where)
        .select(...select)
        .orderBy(...orderBy),
  });

  getAll = this.load('getAll', {
    fn: ({ where, orderBy, limit }) =>
      Author.query()
        .eager('prefs')
        .filter({ where, orderBy, limit }),
  });

  getPoems = this.load('getPoems', {
    fn: ({ id }) => Poem.query().where('author_id', id),
  });

  getLibrary = this.load('getLibrary', {
    fn: () =>
      UserAuthor.query()
        .eager('author')
        .where('user_id', this.userId)
        .then(
          map(({ author, ...rest }) => ({
            ...author,
            ...rest,
          }))
        ),
  });

  addPrefs = this.load('addPrefs', {
    fn: ({ input }) =>
      UserAuthor.query().insert(merge({ user_id: this.userId }, input)),
  });

  updatePrefs = this.load('updatePrefs', {
    fn: ({ input }) =>
      UserAuthor.query().patchAndFetchById(
        [this.userId, input.authorId],
        merge({ user_id: this.userId }, input)
      ),
  });
}

export default AuthorConnector;
