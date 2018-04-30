import BaseConnector from '../BaseConnector';
import { renameKeys } from '../utils';

const renameLibraryPoem = renameKeys({
  poemId: 'poem_id',
  isFavorited: 'is_favorited',
  isBookmarked: 'is_bookmarked',
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
    });

  getLibrary = ({ poemId }) =>
    this.request({
      path: `/api/library/poems/${poemId}`,
    });
}

export default PoemConnector;
