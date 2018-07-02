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
        <Subscriber topic={'HomeHeader/onSearch'} handler={this.handleSearch} />
        <PoemListWithData
          type={'Default'}
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
    console.log('Active B: ', this.isActive());
    return (
      <Screen>
        <Subscriber topic={'HomeHeader/onSearch'} handler={this.handleSearch} />
        <AuthorListWithData
          type={'Default'}
          count={10}
          search={this.state.searchTerm}
          onSelect={this.handleSelect}
        />
      </Screen>
    );
  }
}

export { PoemListScreen, AuthorListScreen };
