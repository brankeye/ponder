import React from 'react';
import {
  Screen,
  PoemViewWithData,
  AuthorViewWithData,
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
        <PoemViewWithData discover />
      </Screen>
    );
  }
}

class AuthorListScreen extends React.Component {
  state = {};

  isActive = () => this.props.navigation.getParam('isActive', false);

  handleSelect = ({ id }) => {
    this.props.navigation.navigate('Poem', { id });
  };

  handleSearch = term => {
    if (this.isActive()) {
      this.setState({ searchTerm: term });
    }
  };

  render() {
    //console.log('Active B: ', this.isActive());
    return (
      <Screen>
        <Subscriber topic={'HomeHeader/onSearch'} handler={this.handleSearch} />
        <AuthorViewWithData discover onSelectPoem={this.handleSelect} />
      </Screen>
    );
  }
}

export { PoemListScreen, AuthorListScreen };
