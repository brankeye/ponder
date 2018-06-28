import BaseConnector from '../BaseConnector';

class UserConnector extends BaseConnector {
  get = () =>
    this.request({
      path: 'api/user',
      method: 'GET',
      auth: true,
    });

  signInAnon = input =>
    this.request({
      path: 'api/user/anon',
      method: 'POST',
      body: input,
    });

  signInSocial = input =>
    this.request({
      path: 'api/user/social',
      method: 'POST',
      body: input,
    });
}

export default UserConnector;
