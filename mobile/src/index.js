import React, { Component } from 'react';
import Expo from 'expo';
import { ApolloProvider } from 'react-apollo';
import client from '@@graphql';
import AppNavigator from '@@screens';
import { StatusBar } from '@@components';

const App = () => (
  <ApolloProvider client={client}>
    <React.Fragment>
      <StatusBar />
      <AppNavigator />
    </React.Fragment>
  </ApolloProvider>
);

Expo.registerRootComponent(App);
