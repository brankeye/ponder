import { User } from 'database';

class UserService {
  constructor(context) {
    this.context = context;
  }

  get = ({ id }: { id: string }) => User.query().findById(id);

  getAll = () => User.query();

  updateSettings = ({ id, push_token, notify, notify_time }) =>
    User.query().patchAndFetchById(id, {
      push_token,
      notify,
      notify_time,
    });
}

export default UserService;
