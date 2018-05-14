import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Screen, AuthorViewWithData } from '@@components';

class AuthorScreen extends Component {
  handleSelectPoem = async poem => {
    const recents = JSON.parse(await AsyncStorage.getItem('recents')) || [];
    if (poem && !recents.find(p => p.id === poem.id)) {
      recents.unshift(poem);
      await AsyncStorage.setItem('recents', JSON.stringify(recents));
    }
    await this.props.navigation.navigate('Poem', { id: poem.id });
  };

  render() {
    const id = this.props.navigation.getParam('id', null);
    return (
      <Screen>
        <AuthorViewWithData id={id} onSelectPoem={this.handleSelectPoem} />
      </Screen>
    );
  }
}

export default AuthorScreen;
