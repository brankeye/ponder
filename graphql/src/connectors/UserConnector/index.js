import BaseConnector from '../BaseConnector';
import { renameKeys } from '../utils';
import { merge } from 'ramda';

const rename = renameKeys({
  pushToken: 'push_token',
  timeZone: 'time_zone',
  notifyTime: 'notify_time',
});

class UserConnector extends BaseConnector {
  get = () =>
    this.request({
      path: 'api/user',
      method: 'GET',
      auth: true,
    });

  signInAnon = ({ settings, ...input }) =>
    this.request({
      path: 'api/user/anon',
      method: 'POST',
      body: merge(input, rename(settings)),
    });

  signInSocial = input =>
    this.request({
      path: 'api/user/social',
      method: 'POST',
      body: input,
    });

  updateSettings = input =>
    this.request({
      path: 'api/user/settings',
      method: 'PUT',
      auth: true,
      body: rename(input),
    });
}

export default UserConnector;
