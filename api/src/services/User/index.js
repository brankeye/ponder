import { User } from 'database';

class UserService {
  constructor(context) {
    this.context = context;
  }

  get = ({ id }: { id: string }) => User.query().findById(id);

  getAll = () => User.query();

  updateSettings = ({ id, settings }) =>
    User.query().patchAndFetchById(id, settings);
}

export default UserService;
