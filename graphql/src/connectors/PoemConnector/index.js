import BaseConnector from '../BaseConnector';
import { renameKeys, pickPaginationOptions } from '../utils';

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
        ...pickPaginationOptions(paginationArgs),
      },
    });

  getRecents = ({ search, ...paginationArgs }) =>
    this.request({
      path: '/api/recents/poems',
      qs: {
        search,
        ...pickPaginationOptions(paginationArgs),
      },
      auth: true,
    });

  getLibrary = ({ search, ...paginationArgs }) =>
    this.request({
      path: '/api/library/poems',
      qs: {
        search,
        ...pickPaginationOptions(paginationArgs),
      },
      auth: true,
    });

  getInfo = ({ id }) =>
    this.request({
      path: `/api/library/poems/${id}`,
      auth: true,
    });

  upsertInfo = ({ input }) =>
    this.request({
      path: '/api/library/poems',
      method: 'PUT',
      auth: true,
      body: rename(input),
    });
}

export default PoemConnector;
