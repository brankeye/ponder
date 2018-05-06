import React from 'react';
import { Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { PoemListWithData, AuthorListWithData } from '@@components/containers';

class PoemListScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <PoemListWithData type={'Default'} count={10} />
      </View>
    );
  }
}

class AuthorListScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <AuthorListWithData type={'Default'} count={10} />
      </View>
    );
  }
}

export default TabNavigator({
  Poems: { screen: PoemListScreen },
  Authors: { screen: AuthorListScreen },
});
