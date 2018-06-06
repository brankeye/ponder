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
    });

  getInfo = ({ id }) =>
    this.authorization
      ? this.request({
          path: `/api/library/poems/${id}`,
          auth: true,
        })
      : { inLibrary: false };

  upsertInfo = ({ input }) =>
    this.request({
      path: '/api/library/poems',
      method: 'PUT',
      auth: true,
      body: rename(input),
    });
}

export default PoemConnector;
