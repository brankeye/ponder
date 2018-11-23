import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import client from './client';

const Component = props => <ApolloProvider {...props} client={client} />;

export default Component;
