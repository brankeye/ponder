import BaseConnector from '../BaseConnector';
import { renameKeys } from '../utils';

const rename = renameKeys({
  id: 'poem_id',
  inLibrary: 'in_library',
  viewedAt: 'viewed_at',
});

class PoemConnector extends BaseConnector {
  get = ({ id }) =>
    this.request({
      path: `/api/poems/${id}`,
    });

  getAll = ({ first, after, last, before }) =>
    this.request({
      path: '/api/poems',
      qs: { first, after, last, before },
    });

  getAllLibrary = ({ first, after, last, before }) =>
    this.request({
      path: '/api/library/poems',
      qs: { first, after, last, before },
      headers: {
        authorization: this.oauthId,
      },
    });

  getLibrary = ({ id }) =>
    this.request({
      path: `/api/library/poems/${id}`,
      headers: {
        authorization: this.oauthId,
      },
    });

  upsertLibrary = ({ input }) =>
    this.request({
      path: '/api/library/poems',
      method: 'PUT',
      headers: {
        authorization: this.oauthId,
      },
      body: rename(input),
    });
}

export default PoemConnector;
