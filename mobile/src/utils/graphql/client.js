import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { GRAPHQL_URL } from '@@config';
import { Constants } from 'expo';
import { Buffer } from 'buffer';

const authorization = Buffer.from(Constants.deviceId).toString('base64');

const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization,
  },
}));

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = new BatchHttpLink({
  uri: GRAPHQL_URL,
  credentials: 'same-origin',
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache,
});

export default client;
