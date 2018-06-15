import BaseConnector from '../BaseConnector';

class UserConnector extends BaseConnector {
  get = () =>
    this.request({
      path: 'api/user',
      method: 'GET',
      auth: true,
    });

  tryRegister = () =>
    this.request({
      path: 'api/user',
      method: 'POST',
      auth: true,
    });
}

export default UserConnector;
