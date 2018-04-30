import BaseConnector from '../BaseConnector';
import { renameKeys } from '../utils';

const renameLibraryAuthor = renameKeys({
  authorId: 'author_id',
  isFavorited: 'is_favorited',
  isBookmarked: 'is_bookmarked',
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
    });

  getLibrary = ({ authorId }) =>
    this.request({
      path: `/api/library/authors/${authorId}`,
    });
}

export default AuthorConnector;
