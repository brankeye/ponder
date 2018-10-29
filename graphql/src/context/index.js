import { UserConnector, AuthorConnector, PoemConnector } from '@@connectors';

class Context {
  constructor(config = {}) {
    this.User = UserConnector.create(config);
    this.Author = AuthorConnector.create(config);
    this.Poem = PoemConnector.create(config);
  }
}

export default config => new Context(config);
