import React from 'react';
import { AsyncStorage } from 'react-native';
import {
  Screen,
  PoemListWithData,
  AuthorListWithData,
  Subscriber,
} from '@@components';

class PoemListScreen extends React.Component {
  state = {};

  isActive = () => this.props.navigation.getParam('isActive', true);

  handleSelect = async poem => {
    const recents = JSON.parse(await AsyncStorage.getItem('recents')) || [];
    if (poem && !recents.find(p => p.id === poem.id)) {
      recents.unshift(poem);
      await AsyncStorage.setItem('recents', JSON.stringify(recents));
    }
    await this.props.navigation.navigate('Poem', { id: poem.id });
  };

  handleSearch = term => {
    if (this.isActive()) {
      this.setState({ searchTerm: term });
    }
  };

  render() {
    return (
      <Screen>
        <Subscriber
          topic={'RecentsHeader/onSearch'}
          handler={this.handleSearch}
        />
        <PoemListWithData
          type={'Recents'}
          count={10}
          search={this.state.searchTerm}
          onSelect={this.handleSelect}
        />
      </Screen>
    );
  }
}

class AuthorListScreen extends React.Component {
  state = {};

  isActive = () => this.props.navigation.getParam('isActive', false);

  handleSelect = ({ id }) => {
    this.props.navigation.navigate('Author', { id });
  };

  handleSearch = term => {
    if (this.isActive()) {
      this.setState({ searchTerm: term });
    }
  };

  render() {
    return (
      <Screen>
        <Subscriber
          topic={'RecentsHeader/onSearch'}
          handler={this.handleSearch}
        />
        <AuthorListWithData
          type={'Recents'}
          count={10}
          search={this.state.searchTerm}
          onSelect={this.handleSelect}
        />
      </Screen>
    );
  }
}

export { PoemListScreen, AuthorListScreen };
