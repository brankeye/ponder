import ApolloClient from 'apollo-boost';
import config from '@@config';

console.log(config);

const client = new ApolloClient({
  uri: config.GRAPHQL_URL,
});

export default client;
