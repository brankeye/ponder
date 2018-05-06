import React, { Component } from 'react';
import Expo from 'expo';
import { ApolloProvider } from 'react-apollo';
import client from '@@graphql';
import AppNavigator from '@@navigation';
import { View, StatusBar, Text } from '@@components/presenters';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <View style={{ flex: 1 }}>
          <StatusBar />
          <AppNavigator />
        </View>
      </ApolloProvider>
    );
  }
}

Expo.registerRootComponent(App);
