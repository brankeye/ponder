import BaseConnector from '../BaseConnector';

class UserConnector extends BaseConnector {
  get = () =>
    this.request({
      path: 'api/user',
      auth: true,
    });
}

export default UserConnector;
