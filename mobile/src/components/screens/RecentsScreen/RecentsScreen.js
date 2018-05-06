import React from 'react';
import { Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';

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

export default TabNavigator({
  RecentPoems: { screen: PoemListScreen },
  RecentAuthors: { screen: AuthorListScreen },
});
