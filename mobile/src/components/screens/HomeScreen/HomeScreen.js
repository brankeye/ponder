import React from 'react';
import { Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { PoemListWithData, AuthorListWithData } from '@@components/containers';

class PoemListScreen extends React.Component {
  handleSelect = poem => {
    this.props.navigation.navigate('Poem', { poem });
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <PoemListWithData
          type={'Default'}
          count={10}
          onSelect={this.handleSelect}
        />
      </View>
    );
  }
}

class AuthorListScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <AuthorListWithData
          type={'Default'}
          count={10}
          handleSelect={this.handleSelect}
        />
      </View>
    );
  }
}

export default createMaterialTopTabNavigator({
  PoemsList: { screen: PoemListScreen },
  AuthorsList: { screen: AuthorListScreen },
});
