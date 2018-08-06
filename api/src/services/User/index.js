import { User } from 'database';

class UserService {
  constructor(context) {
    this.context = context;
  }

  get = ({ id }: { id: string }) => User.query().findById(id);
}

export default UserService;
