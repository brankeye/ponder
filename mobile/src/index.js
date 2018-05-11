import React, { Component } from 'react';
import Expo from 'expo';
import { ApolloProvider } from 'react-apollo';
import client from '@@graphql';
import AppNavigator from '@@screens';
import { StatusBar } from '@@components';
import { ThemeProvider } from '@@consumers';

const App = () => (
  <ApolloProvider client={client}>
    <ThemeProvider>
      <React.Fragment>
        <StatusBar />
        <AppNavigator />
      </React.Fragment>
    </ThemeProvider>
  </ApolloProvider>
);

Expo.registerRootComponent(App);
