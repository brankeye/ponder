import BaseConnector from '../BaseConnector';
import { renameKeys } from '../utils';

const rename = renameKeys({
  id: 'author_id',
  inLibrary: 'in_library',
});

class AuthorConnector extends BaseConnector {
  get = ({ id }) =>
    this.request({
      path: `/api/authors/${id}`,
    });

  getAll = ({ first, after, last, before }) =>
    this.request({
      path: '/api/authors',
      qs: { first, after, last, before },
    });

  getPoems = ({ id }) =>
    this.request({
      path: `/api/authors/${id}/poems`,
    });

  getLibrary = ({ first, after, last, before }) =>
    this.request({
      path: '/api/library/authors',
      qs: { first, after, last, before },
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
