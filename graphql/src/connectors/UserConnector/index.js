import BaseConnector from '../BaseConnector';
const User = require('../../database/models').User;

class UserConnector extends BaseConnector {
  get = () => User.findOne({ where: { id: this.userId } });

  getByOauthId = oauthId => User.findOne({ where: { oauthId } });
}

export default UserConnector;
