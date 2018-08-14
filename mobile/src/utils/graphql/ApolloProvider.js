import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import createClient from './client';

const Component = ({ token, ...props }) => (
  <ApolloProvider {...props} client={createClient({ encodedToken: token })} />
);

export default Component;
