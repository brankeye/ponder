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

  handleSelect = ({ id }) => {
    this.props.navigation.navigate('Poem', { id });
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
          topic={'LibraryHeader/onSearch'}
          handler={this.handleSearch}
        />
        <PoemListWithData
          type={'Library'}
          count={5}
          search={this.state.searchTerm}
          onSelect={this.handleSelect}
        />
      </Screen>
    );
  }
}

class AuthorListScreen extends React.Component {
  state = {};

  isActive = () => this.props.navigation.getParam('isActive', true);

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
          topic={'LibraryHeader/onSearch'}
          handler={this.handleSearch}
        />
        <AuthorListWithData
          type={'Library'}
          count={5}
          search={this.state.searchTerm}
          onSelect={this.handleSelect}
        />
      </Screen>
    );
  }
}

export { PoemListScreen, AuthorListScreen };
