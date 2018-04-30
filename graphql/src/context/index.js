import { AuthorConnector, PoemConnector, UserConnector } from '@@connectors';

class Context {
  constructor(config) {
    this.User = new UserConnector(config);
    this.Author = new AuthorConnector(config);
    this.Poem = new PoemConnector(config);
  }
}

export default config => new Context(config);
