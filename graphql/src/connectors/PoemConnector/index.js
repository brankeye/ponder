import BaseConnector from '../BaseConnector';
import { Poem, UserPoem } from '../../database/models';
import { map, merge } from 'ramda';
import { renameKeys } from '../utils';

const renameLibraryPoem = renameKeys({
  poemId: 'poem_id',
  isFavorited: 'is_favorited',
  isBookmarked: 'is_bookmarked',
});

class PoemConnector extends BaseConnector {
  constructor(config) {
    super({ modelName: 'Poem', ...config });
  }

  get = ({ id }) =>
    this.request({
      path: `/poems/${id}`,
    });

  getAll = ({ first, after, last, before }) =>
    this.request({
      path: '/poems',
      qs: { first, after, last, before },
    });

  getAllLibrary = ({ first, after, last, before }) =>
    this.request({
      path: '/library/poems',
      qs: { first, after, last, before },
    });

  getLibrary = ({ poemId }) =>
    this.request({
      path: `/library/poems/${poemId}`,
    });
}

export default PoemConnector;
