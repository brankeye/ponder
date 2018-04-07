import BaseConnector from '../BaseConnector';
const User = require('../../database/models').User;

class UserConnector extends BaseConnector {
  get = () => User.query.where('id', this.userId);

  getByOauthId = oauthId => User.query.where('oauthId', oauthId);
}

export default UserConnector;
