import BaseConnector from '../BaseConnector';
import { renameKeys } from '../utils';

class UserConnector extends BaseConnector {
  get = () =>
    this.request({
      path: 'api/user',
      method: 'GET',
      auth: true,
    });

  login = clientId =>
    this.request({
      path: 'api/user',
      method: 'POST',
      body: {
        clientId,
      },
    });

  updateSettings = settings =>
    this.request({
      path: 'api/user/settings',
      method: 'PUT',
      auth: true,
      body: renameKeys(
        {
          pushToken: 'push_token',
          timeZone: 'time_zone',
          notifyTime: 'notify_time',
        },
        settings
      ),
    });
}

export default UserConnector;
