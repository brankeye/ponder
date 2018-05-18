import React from 'react';
import { Text, View, AsyncStorage } from 'react-native';
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
      <React.Fragment>
        <Subscriber topic={'HomeHeader/onSearch'} handler={this.handleSearch} />
        <Screen>
          <PoemListWithData
            type={'Default'}
            count={10}
            search={this.state.searchTerm}
            onSelect={this.handleSelect}
          />
        </Screen>
      </React.Fragment>
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
      <React.Fragment>
        <Subscriber topic={'HomeHeader/onSearch'} handler={this.handleSearch} />
        <Screen>
          <AuthorListWithData
            type={'Default'}
            count={10}
            search={this.state.searchTerm}
            onSelect={this.handleSelect}
          />
        </Screen>
      </React.Fragment>
    );
  }
}

export { PoemListScreen, AuthorListScreen };
