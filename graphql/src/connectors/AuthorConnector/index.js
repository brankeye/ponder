import BaseConnector from '../BaseConnector';
const Author = require('../../database/models').Author;
const AuthorPref = require('../../database/models').AuthorPref;

class AuthorConnector extends BaseConnector {
  get = id => Author.findById(id);

  getAll = (limit, offset) =>
    Author.query()
      .limit(limit)
      .offset(offset);

  getAuthorPref = authorId =>
    AuthorPref.findOne({ where: { authorId, userId: this.userId } });

  getAuthorPrefList = () =>
    AuthorPref.findAll({ where: { userId: this.userId } });

  create = input => Author.create(input);

  update = (id, input) => Author.update(input, { where: { id } });

  isFavorite = async id => {
    const prefs = await this.getAuthorPrefList();
    const { isFavorite = false } = prefs.find(x => x.id === id) || {};
    return isFavorite;
  };

  inLibrary = async id => {
    const prefs = await this.getAuthorPrefList();
    const { inLibrary = false } = prefs.find(x => x.id === id) || {};
    return inLibrary;
  };
}

export default AuthorConnector;
