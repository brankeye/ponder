import { PoemService, AuthorService, UserService } from 'services';

class Context {
  PoemService = new PoemService(this);
  AuthorService = new AuthorService(this);
  UserService = new UserService(this);
}

export default () => new Context();
