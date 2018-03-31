import BaseConnector from '../BaseConnector';
const Author = require('../../database/models').Author;
const AuthorInfo = require('../../database/models').AuthorInfo;

class AuthorConnector extends BaseConnector {
  get = id => Author.findById(id);

  getAuthorInfo = authorId =>
    AuthorInfo.findOne({ where: { authorId, userId: this.userId } });

  getAuthorInfos = () => AuthorInfo.findAll({ where: { userId: this.userId } });

  create = input => Author.create(input);

  update = (id, input) => Author.update(input, { where: { id } });

  isFavorite = async id => {
    const infos = await this.getAuthorInfos();
    const { isFavorite = false } = infos.find(x => x.id === id) || {};
    return isFavorite;
  };

  inLibrary = async id => {
    const infos = await this.getAuthorInfos();
    const { inLibrary = false } = infos.find(x => x.id === id) || {};
    return inLibrary;
  };
}

export default AuthorConnector;
