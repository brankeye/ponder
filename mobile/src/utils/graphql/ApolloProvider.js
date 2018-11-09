import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import createClient from './client';

const Component = ({ authorization, ...props }) => (
  <ApolloProvider {...props} client={createClient(authorization)} />
);

export default Component;
