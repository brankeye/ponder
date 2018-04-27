import ModelConnector from '../ModelConnector';
import { Author, UserAuthor, Poem } from '../../database/models';
import { map, merge } from 'ramda';
import { renameKeys } from '../utils';

const renameLibraryAuthor = renameKeys({
  authorId: 'author_id',
  isFavorited: 'is_favorited',
  isBookmarked: 'is_bookmarked',
});

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

  getAllLibrary = this.load('getLibrary', {
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

  getLibrary = this.load('get', {
    fn: ({ id }) => UserAuthor.query().findById(id),
  });

  insertLibrary = this.load('insertLibrary', {
    fn: ({ input }) =>
      UserAuthor.query().insert(
        merge({ user_id: this.userId }, renameLibraryAuthor(input))
      ),
  });

  updateLibrary = this.load('updateLibrary', {
    fn: ({ input }) =>
      UserAuthor.query().patchAndFetchById(
        [this.userId, input.authorId],
        merge({ user_id: this.userId }, renameLibraryAuthor(input))
      ),
  });

  upsertLibrary = this.load('upsertLibrary', {
    fn: async ({ input }) => {
      const authorLib = await this.getLibrary({
        id: [this.userId, input.authorId],
      });
      if (authorLib) {
        return this.updateLibrary({ input });
      } else {
        return this.insertLibrary({ input });
      }
    },
  });
}

export default AuthorConnector;
