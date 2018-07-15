import { User } from 'database';

class UserService {
  get = ({ id }: { id: string }) => User.query().findById(id);
}

export default UserService;
