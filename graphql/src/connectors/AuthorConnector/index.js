import BaseConnector from '../BaseConnector';
import { renameKeys } from '../utils';

const rename = renameKeys({
  authorId: 'author_id',
  inLibrary: 'in_library',
  viewedAt: 'viewed_at',
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

  getAllLibrary = ({ first, after, last, before }) =>
    this.request({
      path: '/api/library/authors',
      qs: { first, after, last, before },
      headers: {
        authorization: this.oauthId,
      },
    });

  getLibrary = ({ id }) =>
    this.request({
      path: `/api/library/authors/${id}`,
      headers: {
        authorization: this.oauthId,
      },
    });

  upsertLibrary = ({ input }) =>
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
