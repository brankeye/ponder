import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { compose } from 'recompose';
import { themeQuery } from '@@graphql';
import config from '@@config';

const cache = new InMemoryCache();

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({
  uri: config.GRAPHQL_URL,
  credentials: 'same-origin',
});

const stateLink = withClientState({
  cache,
  defaults: {},
  resolvers: {},
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, stateLink, httpLink]),
  cache,
});

export default client;
