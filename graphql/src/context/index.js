import { AuthorConnector, PoemConnector, UserConnector } from '@@connectors';

class Context {
  constructor(config) {
    const connectorConfig = {
      ...config,
    };

    this.User = new UserConnector(connectorConfig);
    this.Author = new AuthorConnector(connectorConfig);
    this.Poem = new PoemConnector(connectorConfig);
  }
}

export default config => new Context(config);
