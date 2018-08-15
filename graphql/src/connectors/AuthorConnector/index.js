import BaseConnector from '../BaseConnector';
import { renameKeys, pickPaginationOptions } from '../utils';

const rename = renameKeys({
  id: 'author_id',
  inLibrary: 'in_library',
});

class AuthorConnector extends BaseConnector {
  get = ({ id }) =>
    this.request({
      path: `/api/authors/${id}`,
    });

  getAll = ({ search, ...paginationArgs }) =>
    this.request({
      path: '/api/authors',
      qs: {
        search,
        ...pickPaginationOptions(paginationArgs),
      },
    });

  getPoems = ({ id }) =>
    this.request({
      path: `/api/authors/${id}/poems`,
    });

  getRecents = ({ search, ...paginationArgs }) =>
    this.request({
      path: '/api/recents/authors',
      qs: {
        search,
        ...pickPaginationOptions(paginationArgs),
      },
      auth: true,
    });

  getLibrary = ({ search, ...paginationArgs }) =>
    this.request({
      path: '/api/library/authors',
      qs: {
        search,
        ...pickPaginationOptions(paginationArgs),
      },
      auth: true,
    });

  getInfo = ({ id }) =>
    this.request({
      path: `/api/library/authors/${id}`,
      auth: true,
    });

  upsertInfo = ({ input }) =>
    this.request({
      path: '/api/library/authors',
      method: 'PUT',
      auth: true,
      body: rename(input),
    });
}

export default AuthorConnector;
