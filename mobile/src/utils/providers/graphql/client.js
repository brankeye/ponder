import { ApolloClient } from 'apollo-client';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { setContext } from 'apollo-link-context';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { GRAPHQL_URL } from 'react-native-dotenv';
import { Constants } from 'expo';
import { Buffer } from 'buffer';
import introspectionQueryResultData from '../../../../fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const authorization = Buffer.from(Constants.deviceId).toString('base64');

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization,
  },
}));

const httpLink = new BatchHttpLink({
  uri: GRAPHQL_URL,
  credentials: 'same-origin',
});

const cache = new InMemoryCache({
  fragmentMatcher,
});

const stateLink = withClientState({
  cache,
  defaults: {
    poemRecents: {
      __typename: 'PoemConnection',
      edges: [],
      pageInfo: null,
    },
    poemLibrary: {
      __typename: 'PoemConnection',
      edges: [],
      pageInfo: null,
    },
    authorRecents: {
      __typename: 'AuthorConnection',
      edges: [],
      pageInfo: null,
    },
    authorLibrary: {
      __typename: 'AuthorConnection',
      edges: [],
      pageInfo: null,
    },
  },
});

const client = new ApolloClient({
  link: ApolloLink.from([stateLink, errorLink, authLink, httpLink]),
  cache,
  defaultOptions: {
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
  },
});

export default client;
