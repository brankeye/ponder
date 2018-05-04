import BaseConnector from '../BaseConnector';

class UserConnector extends BaseConnector {
  get = () =>
    this.request({
      path: 'api/user',
      headers: { authorization: this.oauthId },
    });
}

export default UserConnector;
