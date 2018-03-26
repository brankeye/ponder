import { AuthorConnector, PoemConnector } from '@@connectors';

class Context {
  constructor() {
    this.Author = new AuthorConnector();
    this.Poem = new PoemConnector();
  }
}

export default new Context();
