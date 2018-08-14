import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { GRAPHQL_URL } from '@@config';

const cache = new InMemoryCache();

const authLink = encodedToken =>
  setContext((_, { headers }) => {
    if (encodedToken) {
      return {
        headers: {
          ...headers,
          authorization: encodedToken,
        },
      };
    } else {
      return { headers };
    }
  });

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

const client = ({ encodedToken } = {}) =>
  new ApolloClient({
    link: ApolloLink.from([errorLink, authLink(encodedToken), httpLink]),
    cache,
  });

export default client;
