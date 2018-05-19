import BaseConnector from '../BaseConnector';
import { renameKeys, parsePaginationOptions } from '../utils';

const rename = renameKeys({
  id: 'poem_id',
  inLibrary: 'in_library',
});

class PoemConnector extends BaseConnector {
  get = ({ id }) =>
    this.request({
      path: `/api/poems/${id}`,
    });

  getAll = ({ search, ...paginationArgs }) =>
    this.request({
      path: '/api/poems',
      qs: {
        search,
        ...parsePaginationOptions(paginationArgs),
      },
    });

  getLibrary = ({ search, ...paginationArgs }) =>
    this.request({
      path: '/api/library/poems',
      qs: {
        search,
        ...parsePaginationOptions(paginationArgs),
      },
      auth: true,
      headers: {
        authorization: this.oauthId,
      },
    });

  getInfo = ({ id }) =>
    this.request({
      path: `/api/library/poems/${id}`,
      auth: true,
      headers: {
        authorization: this.oauthId,
      },
    });

  upsertInfo = ({ input }) =>
    this.request({
      path: '/api/library/poems',
      method: 'PUT',
      auth: true,
      headers: {
        authorization: this.oauthId,
      },
      body: rename(input),
    });
}

export default PoemConnector;
