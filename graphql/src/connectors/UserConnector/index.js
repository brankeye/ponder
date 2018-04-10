import ModelConnector from '../ModelConnector';
import { User } from '../../database/models';

class UserConnector extends ModelConnector {
  constructor(config) {
    super({ modelName: 'User', ...config });
  }

  get = this.load('get', {
    fn: () =>
      User.query()
        .where('id', this.userId)
        .first(),
  });

  getByOauthId = this.load('getByOauthId', {
    fn: ({ oauthId }) =>
      User.query()
        .where('oauthId', oauthId)
        .first(),
  });
}

export default UserConnector;
