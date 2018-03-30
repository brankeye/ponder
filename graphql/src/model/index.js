import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { map, prop, flatten, reduce, mergeDeepLeft } from 'ramda';

import * as author from './author';
import * as poem from './poem';

const models = [author, poem];

const mergeDeepLeftAll = reduce(mergeDeepLeft, {});

const typeDefs = flatten(map(prop('types'), models));
const resolvers = mergeDeepLeftAll(map(prop('resolver'), models));
const mockResolvers = mergeDeepLeftAll(map(prop('mockResolver'), models));

const getSchema = ({ enableMocks } = {}) => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });
  if (enableMocks) {
    addMockFunctionsToSchema({ schema, mocks: mockResolvers });
  }
  return schema;
};

export default getSchema;
