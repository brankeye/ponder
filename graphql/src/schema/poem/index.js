import gqlTypes from './types.graphql';
const types = () => [gqlTypes];
export { types };
export { default as resolver } from './resolver';
export { default as mockResolver } from './mockResolver';
