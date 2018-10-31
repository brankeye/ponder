import {
  RequestLoader,
  UserConnector,
  AuthorConnector,
  PoemConnector,
} from '@@connectors';

export default {
  create: (config = {}) => {
    const loader = RequestLoader.create();
    const request = args => loader.load(args);
    return {
      User: UserConnector.create(request, config),
      Author: AuthorConnector.create(request, config),
      Poem: PoemConnector.create(request, config),
    };
  },
};
