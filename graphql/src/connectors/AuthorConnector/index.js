import { Author } from '@@database';

class AuthorConnector {
  get = id => Author.findById(id);

  create = input => Author.create(input);
}

export default AuthorConnector;
