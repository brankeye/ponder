import BaseConnector from '../BaseConnector';
import { renameKeys, parsePaginationOptions } from '../utils';

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
        ...parsePaginationOptions(paginationArgs),
      },
    });

  getPoems = ({ id }) =>
    this.request({
      path: `/api/authors/${id}/poems`,
    });

  getLibrary = ({ search, ...paginationArgs }) =>
    this.request({
      path: '/api/library/authors',
      qs: {
        search,
        ...parsePaginationOptions(paginationArgs),
      },
      headers: {
        authorization: this.oauthId,
      },
    });

  getInfo = ({ id }) =>
    this.request({
      path: `/api/library/authors/${id}`,
      headers: {
        authorization: this.oauthId,
      },
    });

  upsertInfo = ({ input }) =>
    this.request({
      path: '/api/library/authors',
      method: 'PUT',
      headers: {
        authorization: this.oauthId,
      },
      body: rename(input),
    });
}

export default AuthorConnector;
