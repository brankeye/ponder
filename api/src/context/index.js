// @flow

import { Poem, Author, User } from 'services';

export type Context = {
  Poem: Object,
  Author: Object,
  User: Object,
};

export default (input: ?Object = {}): Context => ({
  ...input,
  PoemService: new Poem(),
  AuthorService: new Author(),
  UserService: new User(),
});
