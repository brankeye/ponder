import { AuthorConnector, PoemConnector, UserConnector } from '@@connectors';
import config from '@@server/config';

class Context {
  constructor() {
    const connectorConfig = {
      userId: config.userId,
    };

    this.User = new UserConnector(connectorConfig);
    this.Author = new AuthorConnector(connectorConfig);
    this.Poem = new PoemConnector(connectorConfig);
  }
}

export default new Context();
