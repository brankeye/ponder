import ModelConnector from '../ModelConnector';
import { Author, AuthorPref } from '../../database/models';
import { map } from 'ramda';

class AuthorConnector extends ModelConnector {
  constructor(config) {
    super({ modelName: 'Author', ...config });
  }

  get = id =>
    this.load({
      fn: () => Author.query().findById(id),
      name: 'get',
      key: id,
    });

  getAll = (limit, offset) =>
    this.load({
      fn: () =>
        Author.query()
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

  getLibraryAuthors = () =>
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
      name: 'getLibraryAuthors',
      key: true,
    });
}

export default AuthorConnector;
