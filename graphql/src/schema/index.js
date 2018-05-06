import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { map, prop, propOr, flatten, reduce, mergeDeepLeft } from 'ramda';
import { addMiddlewareToSchema } from './middleware';

import * as scalars from './scalars';
import * as user from './user';
import * as author from './author';
import * as poem from './poem';

const models = [scalars, user, author, poem];

const mergeDeepLeftAll = reduce(mergeDeepLeft, {});

const typeDefs = flatten(map(prop('types'), models));
const resolvers = mergeDeepLeftAll(map(propOr({}, 'resolver'), models));
const mockResolvers = mergeDeepLeftAll(map(propOr({}, 'mockResolver'), models));

const getSchema = ({ enableMocks } = {}) => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    inheritResolversFromInterfaces: true,
  });
  addMiddlewareToSchema(schema);
  if (enableMocks) {
    addMockFunctionsToSchema({ schema, mocks: mockResolvers });
  }
  return schema;
};

export default getSchema();
