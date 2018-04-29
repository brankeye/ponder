import ModelConnector from '../ModelConnector';
import { Poem, UserPoem } from '../../database/models';
import { map, merge } from 'ramda';
import { renameKeys } from '../utils';

const renameLibraryPoem = renameKeys({
  poemId: 'poem_id',
  isFavorited: 'is_favorited',
  isBookmarked: 'is_bookmarked',
});

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
        .filter({ select, where, orderBy, limit }),
  });

  getAllLibrary = this.load('getLibrary', {
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

  getLibrary = this.load('get', {
    fn: ({ id }) => UserPoem.query().findById(id),
  });

  insertLibrary = this.load('insertLibrary', {
    fn: ({ input }) =>
      UserPoem.query().insert(
        merge({ user_id: this.userId }, renameLibraryPoem(input))
      ),
  });

  updateLibrary = this.load('updateLibrary', {
    fn: ({ input }) =>
      UserPoem.query().patchAndFetchById(
        [this.userId, input.poemId],
        merge({ user_id: this.userId }, renameLibraryPoem(input))
      ),
  });

  upsertLibrary = this.load('upsertLibrary', {
    fn: async ({ input }) => {
      const poemLib = await this.getLibrary({
        id: [this.userId, input.poemId],
      });
      if (poemLib) {
        return this.updateLibrary({ input });
      } else {
        return this.insertLibrary({ input });
      }
    },
  });
}

export default PoemConnector;
