import BaseConnector from '../BaseConnector';

class UserConnector extends BaseConnector {
  get = () =>
    this.request({
      path: 'api/user',
      method: 'GET',
      auth: true,
    });

  registerAnonUser = () =>
    this.request({
      path: 'api/user',
      method: 'POST',
      auth: true,
    });

  registerSocialUser = () =>
    this.request({
      path: 'api/user',
      method: 'PUT',
      auth: true,
    });
}

export default UserConnector;
