import ModelConnector from '../ModelConnector';
import { User } from '../../database/models';

class UserConnector extends ModelConnector {
  constructor(config) {
    super({ modelName: 'User', ...config });
  }

  get = this.load('get', {
    fn: () => User.query().findById(this.userId),
    verbose: true,
  });

  getByOauthId = this.load('getByOauthId', {
    fn: ({ oauthId }) =>
      User.query()
        .where('oauth_id', oauthId)
        .first(),
  });
}

export default UserConnector;
