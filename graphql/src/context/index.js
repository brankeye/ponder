import { AuthorConnector } from '@@connectors';

class Context {
  constructor() {
    this.Author = new AuthorConnector();
  }
}

export default new Context();
