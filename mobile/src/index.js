import React, { Component } from 'react';
import Expo from 'expo';
import { Provider } from 'mobx-react/native';
import { ApolloProvider } from 'react-apollo';
import client from '@@graphql';
import { default as Navigator } from '@@navigation';
import { View, StatusBar, Text } from '@@components/presenters';
import stores from '@@stores';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Provider {...stores}>
          <View style={{ flex: 1 }}>
            <StatusBar />
            <Navigator />
          </View>
        </Provider>
      </ApolloProvider>
    );
  }
}

Expo.registerRootComponent(App);
