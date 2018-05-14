import React from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { Screen, PoemListWithData, AuthorListWithData } from '@@components';

class PoemListScreen extends React.Component {
  handleSelect = async poem => {
    const recents = JSON.parse(await AsyncStorage.getItem('recents')) || [];
    if (poem && !recents.find(p => p.id === poem.id)) {
      recents.unshift(poem);
      await AsyncStorage.setItem('recents', JSON.stringify(recents));
    }
    await this.props.navigation.navigate('Poem', { id: poem.id });
  };

  render() {
    return (
      <Screen>
        <PoemListWithData
          type={'Library'}
          count={10}
          onSelect={this.handleSelect}
        />
      </Screen>
    );
  }
}

class AuthorListScreen extends React.Component {
  handleSelect = ({ id }) => {
    this.props.navigation.navigate('Author', { id });
  };

  render() {
    return (
      <Screen>
        <AuthorListWithData
          type={'Library'}
          count={10}
          onSelect={this.handleSelect}
        />
      </Screen>
    );
  }
}

export { PoemListScreen, AuthorListScreen };
