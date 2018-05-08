import BaseConnector from '../BaseConnector';
import { renameKeys } from '../utils';

const rename = renameKeys({
  id: 'poem_id',
  inLibrary: 'in_library',
});

class PoemConnector extends BaseConnector {
  get = ({ id }) =>
    this.request({
      path: `/api/poems/${id}`,
    });

  getAll = ({ first, after, last, before, hasNextPage, hasPreviousPage }) =>
    this.request({
      path: '/api/poems',
      qs: { first, after, last, before, hasNextPage, hasPreviousPage },
    });

  getLibrary = ({ first, after, last, before, hasNextPage, hasPreviousPage }) =>
    this.request({
      path: '/api/library/poems',
      qs: { first, after, last, before, hasNextPage, hasPreviousPage },
      headers: {
        authorization: this.oauthId,
      },
    });

  getInfo = ({ id }) =>
    this.request({
      path: `/api/library/poems/${id}`,
      headers: {
        authorization: this.oauthId,
      },
    });

  upsertInfo = ({ input }) =>
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
