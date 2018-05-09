import React from 'react';
import { Text, View } from 'react-native';
import { Screen } from '@@components';

class PoemListScreen extends React.Component {
  render() {
    return (
      <Screen>
        <Text>Recent Poems!</Text>
      </Screen>
    );
  }
}

class AuthorListScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Recent Authors!</Text>
      </View>
    );
  }
}

export { PoemListScreen, AuthorListScreen };
