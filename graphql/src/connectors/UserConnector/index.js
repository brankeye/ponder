import BaseConnector from '../BaseConnector';
const User = require('../../database/models').User;

class UserConnector extends BaseConnector {
  get = () => User.findById(this.userId);
}

export default UserConnector;
