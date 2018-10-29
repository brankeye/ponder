import { User } from 'database';
import uuid from 'uuid/v4';

class UserService {
  constructor(context) {
    this.context = context;
  }

  getUser = async clientId => {
    const user = await User.query().findOne('client_id', clientId);
    return (
      user ||
      (await User.query()
        .insert({
          id: uuid(),
          client_id: clientId,
          anonymous: true,
        })
        .returning('*'))
    );
  };

  updateSettings = (id, settings) =>
    User.query().patchAndFetchById(id, settings);
}

export default UserService;
