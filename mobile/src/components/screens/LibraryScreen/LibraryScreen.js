import React from 'react';
import { Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { PoemListWithData, AuthorListWithData } from '@@components/containers';

class PoemListScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <PoemListWithData type={'Library'} count={10} />
      </View>
    );
  }
}

class AuthorListScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <AuthorListWithData type={'Library'} count={10} />
      </View>
    );
  }
}

export default createMaterialTopTabNavigator({
  PoemsLibrary: { screen: PoemListScreen },
  AuthorsLibrary: { screen: AuthorListScreen },
});
