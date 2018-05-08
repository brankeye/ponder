import React from 'react';
import { Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';

class PoemListScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Recent Poems!</Text>
      </View>
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

export default createMaterialTopTabNavigator({
  RecentPoems: { screen: PoemListScreen },
  RecentAuthors: { screen: AuthorListScreen },
});
