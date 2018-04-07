import ModelConnector from '../ModelConnector';
import { User } from '../../database/models';

class UserConnector extends ModelConnector {
  constructor(config) {
    super({ modelName: 'User', ...config });
  }

  get = () =>
    this.load({
      fn: () =>
        User.query()
          .where('id', this.userId)
          .first(),
      name: 'get',
      key: this.userId,
    });

  getByOauthId = oauthId =>
    this.load({
      fn: () =>
        User.query()
          .where('oauthId', oauthId)
          .first(),
      name: 'getByOauthId',
      key: oauthId,
    });
}

export default UserConnector;
