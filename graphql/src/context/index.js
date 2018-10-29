import { UserConnector, AuthorConnector, PoemConnector } from '@@connectors';

export default {
  create: (config = {}) => ({
    User: UserConnector.create(config),
    Author: AuthorConnector.create(config),
    Poem: PoemConnector.create(config),
  }),
};
